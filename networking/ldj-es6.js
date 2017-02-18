'use strict';

const EventEmitter = require('events');

class LDJClient extends EventEmitter {
	constructor(stream) {
		super();

		let buffer = '';
		stream.on('data', data => {
			buffer += data;
			let boundary = buffer.indexOf('\n');
			while (boundary !== -1) {
				let input = buffer.substr(0, boundary);
				buffer = buffer.substr(boundary + 1);
				this.emit('message', JSON.parse(input));
				boundary = buffer.indexOf('\n');
			}
		});
	}
}

// expose module methods
exports.LDJClient = LDJClient;
exports.connect = stream => {
	return new LDJClient(stream);
};
