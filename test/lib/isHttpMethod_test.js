const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isHttpMethod = require('../../lib/isHttpMethod.js');
const assert = require('assert');

assert( isHttpMethod('get') === true )
assert( isHttpMethod('POST') === true )
assert( isHttpMethod('klkl') === false )
