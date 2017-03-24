const isArray = require('../../lib/isArray');
const assert = require('assert');

assert( isArray([]) === true );
assert( isArray({}) === false );

