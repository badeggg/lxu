const pathBasename = require('path').basename;
console.log(`-main.js for test--------------${pathBasename(__filename)}`);

const fork = require('child_process').fork;

fork(`${__dirname}/lib/lib_test.js`);
fork(`${__dirname}/src/src_test.js`);
