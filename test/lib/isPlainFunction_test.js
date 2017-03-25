const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isPlainFunction = require('../../lib/isPlainFunction.js');
const assert = require('assert');

assert( isPlainFunction(function(){}) === true );
assert( isPlainFunction(function *(){}) === false );
assert( isPlainFunction(async function(){}) === false );
assert( isPlainFunction({}) === false );
