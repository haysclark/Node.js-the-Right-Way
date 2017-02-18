'use strict';

const fs = require('fs');

const filename = process.argv[2];

if (!filename) {
	throw new Error('A file to watch must be specified!');
}
// fs.watch() results in two change callbacks
// http://stackoverflow.com/questions/12978924/fs-watch-fired-twice-when-i-change-the-watched-file
fs.watchFile(filename, () => {
	console.log('File ' + filename + ' just changed!');
});
console.log('Now watching ' + filename + ' for changes...');
