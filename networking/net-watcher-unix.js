'use strict';

const fs = require('fs');
const net = require('net');

const filename = process.argv[2];
const server = net.createServer(connection => {
  // reporting
	console.log('Subscriber connected.');
	connection.write('Now watching \'' + filename + '\' for changes...\n');
  // watcher setup
	let watcher = fs.watch(filename, () => {
    // using 'new Date()' to match expected output from book example: eg: Sat Jan 12 2013 12: 35: 52 GMT-0500 (EST)
		connection.write('File \'' + filename + '\' changed: ' + new Date().toString() + '\n');
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

server.listen('/tmp/watcher.sock', () => {
	console.log('Listening for subscribers...');
});
