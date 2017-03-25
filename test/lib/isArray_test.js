const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isArray = require('../../lib/isArray');
const assert = require('assert');

assert( isArray([]) === true );
assert( isArray({}) === false );

