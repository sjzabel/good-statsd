# good-statsd

Udp broadcasting for Good process monitor

[![Build Status](https://travis-ci.org/sjzabel/good-statsd.svg?branch=master)](https://travis-ci.org/sjzabel/good-statsd) ![Current Version](https://img.shields.io/npm/v/good-statsd.svg)

Lead Maintainer: [Stephen J. Zabel](https://github.com/sjzabel)

## Usage

`good-statsd` is a [good-reporter](https://github.com/hapijs/good-reporter) implementation to write [hapi](http://hapijs.com/) server events to remote endpoints. It sends a request with a JSON payload to the supplied `endpoint`.

### Note
`good-statsd` will never close the udp client.

## Good Udp
### new GoodStatsd (events, endpoint, [options])

creates a new GoodStatsd object with the following arguments
- `events` - an object of key value pairs.
		- `key` - one of the supported [good events](https://github.com/hapijs/good) indicating the hapi event to subscribe to
		- `value` - a single string or an array of strings to filter incoming events. "\*" indicates no filtering. `null` and `undefined` are assumed to be "\*"
- `endpoint` - full path to remote server to transmit logs.
- `[options]` - optional arguments object
	- `threshold` - number of events to hold before transmission. Defaults to `20`. Set to `0` to have every event start transmission instantly. It is strongly suggested to have a set threshold to make data transmission more efficient.
	- `udpType` - a string with the type of udp you want to use. Valid options are udp4 or udp6. Defaults to `'udp4'`.

### GoodStatsd Methods
`good-statsd` implements the [good-reporter](https://github.com/hapijs/good-reporter) interface as has no additional public methods.

- `stop()` - `GoodStatsd` will make a final attempt to transmit anything remaining in it's internal event queue when `stop` is called.

### Statsd
TODO:  Fill this in once I figure out how I want this to be
extensible
