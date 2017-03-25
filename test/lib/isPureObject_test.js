const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isPureObject = require('../../lib/isPureObject.js');
const assert = require('assert');

assert( isPureObject({}) === true );
assert( isPureObject([]) === false );
assert( isPureObject('') === false );

