const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isAsyncFunction = require('../../lib/isAsyncFunction.js');
const assert = require('assert');

assert( isAsyncFunction(async function(){}) === true );
assert( isAsyncFunction(function* (){}) === false );
