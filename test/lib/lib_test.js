const pathBasename = require('path').basename;
console.log(`-folder--------------${pathBasename(__filename)}`);

const fork = require('child_process').fork;

fork(`${__dirname}/_getClassString_test.js`);
fork(`${__dirname}/isArray_test.js`);
fork(`${__dirname}/isAsyncFunction.js`);
fork(`${__dirname}/isHttpMethod_test.js`);
fork(`${__dirname}/isPathStr_test.js`);
fork(`${__dirname}/isPlainFunction_test.js`);
fork(`${__dirname}/isPureObject_test.js`);
fork(`${__dirname}/isGeneratorFunction_test.js`);
fork(`${__dirname}/genTransAsync_test.js`);
