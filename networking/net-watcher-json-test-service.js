'use strict';

// simulate the case of a split message coming from the server.
const net = require('net');

const server = net.createServer(connection => {
	console.log('Subscriber connected');
  // send the first chunk immediately
	connection.write('{"type":"changed","file":"targ');

  // after a one second delay, send the other chunk
	let timer = setTimeout(() => {
		connection.write('et.txt","timestamp":1358175758495}\n');
		connection.end();
	}, 1000);
  // clear timer when the connection ends
	connection.on('end', () => {
		clearTimeout(timer);
		console.log('Subscriber disconnected');
	});
});

server.listen(5432, () => {
	console.log('Test server listening for Subscribers...');
});
