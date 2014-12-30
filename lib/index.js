// Load modules

var GoodReporter = require('good-reporter');
var Hoek = require('hoek');
var Os = require('os');
var StatsdClient = require('statsd-client');
var __ = require('underscore');


var internals = {
	defaults: {
		threshold: 20,
		host: 'localhost',
		port: '8125',
		prefix: 'hapi',
		pathSeparator: '_',
		template: '<%=path%>.<%=method%>.<%=statusCode%>'
	},
	host: Os.hostname()
};


module.exports = internals.GoodStatsd = function (events, options) {
	options = options || {};

  Hoek.assert(this.constructor === internals.GoodStatsd
      || this.constructor.super_ === internals.GoodStatsd, 'GoodStatsd & GoodReporter must be created with new');

	var settings = Hoek.applyToDefaults(internals.defaults, options);

	this._statsdClient = new StatsdClient({
		host: settings.host,
		port: settings.port,
		prefix: settings.prefix
	});

	GoodReporter.call(this, events, settings);
	this._eventQueue = [];
  this._eventTemplate = __.template(settings.template);
};


Hoek.inherits(internals.GoodStatsd, GoodReporter);


internals.GoodStatsd.prototype.start = function (emitter, callback) {
	emitter.on('report', this._handleEvent.bind(this));
	return callback(null);
};


internals.GoodStatsd.prototype.stop = function () {
	this._sendMessages();
};


internals.GoodStatsd.prototype._report = function (event, eventData) {
	this._eventQueue.push(eventData);

	if (this._eventQueue.length < this._settings.threshold) { return; }

  this._sendMessages();
  this._eventQueue.length = 0;
};


internals.GoodStatsd.prototype._sendMessages = function () {
	if (!this._eventQueue.length) { return; }

  var me = this;
  var rslts = this._sortAndCount(this._eventQueue);

  __(rslts).each( function( ct, k ) {
    me._statsdClient.increment(k, ct);
  });
};


internals.GoodStatsd.prototype._normalizePath = function(path) {
  path = (path.indexOf('/') === 0) ? path.substr(1) : path;
  return path.replace(/\//g, this._settings.pathSeparator);
};


internals.GoodStatsd.prototype._sortAndCount = function(eventQueue) {
  var me = this;

  var rslts = __.countBy(eventQueue,
    function(event){
      event.path = me._normalizePath(event.path)
      return me._eventTemplate(event);
    }
  );

	return rslts;
};
