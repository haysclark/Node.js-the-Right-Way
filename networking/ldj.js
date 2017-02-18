'use strict';

// There are other ways to do inheritance in JavaScript,
// but this is how Node.js’s own modules are structured
const events = require('events');
const util = require('util');

// client constructor
// note: you can NOT use arrow functions for constructors
const LDJClient = function (stream) {
	events.EventEmitter.call(this);
	let self = this;
	let buffer = '';
	stream.on('data', data => {
		buffer += data;
		let boundary = buffer.indexOf('\n');
		while (boundary !== -1) {
			let input = buffer.substr(0, boundary);
			buffer = buffer.substr(boundary + 1);
			self.emit('message', JSON.parse(input));
			boundary = buffer.indexOf('\n');
		}
	});
};
util.inherits(LDJClient, events.EventEmitter);

// expose module methods
exports.LDJClient = LDJClient;
exports.connect = stream => {
	return new LDJClient(stream);
};
