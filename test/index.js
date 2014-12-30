//Load modules

var Dgram = require('dgram');
var EventEmitter = require('events').EventEmitter;
var Code = require('code');
var GoodStatsd = require('..');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

// Declare internals

var internals = {};


internals.makeServer = function (handler) {
};

// Test shortcuts

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


it('throws an error without using new', function (done) {

	expect(function () {

		var reporter = GoodStatsd({ log: '*' }, 'www.github.com');
	}).to.throw('GoodStatsd & GoodReporter must be created with new');

	done();
});

it('can be invoked without optional options object', function (done) {

	expect(function () {

		var reporter = new GoodStatsd({ log: '*' });
	}).not.to.throw();

	done();
});

it('does not report if the event que is empty', function (done) {

	var reporter = new GoodStatsd({ log: '*' }, { udpType: 'udp4', threshold: 5 });

	var result = reporter._sendMessages();
	expect(result).to.not.exist;

	done();
});

describe('_report()', function () {

	it('honors the threshold setting and sends the event in a batch', function (done) {
    done();
	});

	it('sends each event individually if threshold is 0', function (done) {
    done();
	});
});

describe('stop()', function () {

	it('makes a last attempt to send any remaining log entries', function (done) {
    done();
	});
});

