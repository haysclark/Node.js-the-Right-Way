'use strict';

const fs = require('fs');
const net = require('net');

const filename = process.argv[2];
const server = net.createServer(connection => {
  // reporting
	console.log('Subscriber connected.');
	connection.write(JSON.stringify({
		type: 'watching',
		file: filename
	}) + '\n');
  // watcher setup
	let watcher = fs.watch(filename, () => {
		connection.write(JSON.stringify({
			type: 'changed',
			file: filename,
			timestamp: Date.now()
		}) + '\n');
	});
  // cleanup
	connection.on('close', () => {
		console.log('Subscriber disconnected.');
		watcher.close();
	});
});

if (!filename) {
	throw new Error('No target filename was specified.');
}

server.listen(5432, () => {
	console.log('Listening for subscribers...');
});
