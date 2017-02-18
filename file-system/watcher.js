const fs = require('fs');

// fs.watch() results in two change callbacks
// http://stackoverflow.com/questions/12978924/fs-watch-fired-twice-when-i-change-the-watched-file
fs.watchFile('target.txt', () => {
	console.log('File \'target.txt\' just changed!');
});
console.log('Now watching \'target.txt\' for changes...');
