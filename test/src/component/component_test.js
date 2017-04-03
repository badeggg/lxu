const pathBasename = require('path').basename;
console.log(`-folder--------------${pathBasename(__filename)}`);

const fork = require('child_process').fork;

fork(`${__dirname}/isLxuPath_test.js`);
fork(`${__dirname}/isMiddlewareMatch_test.js`);
fork(`${__dirname}/isPathMatch_test.js`);
fork(`${__dirname}/parseUrl_test.js`);
