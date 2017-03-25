const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isPathStr = require('../../lib/isPathStr.js');
const assert = require('assert');

assert( isPathStr('/') === true );
assert( isPathStr('/somepath') === true );
assert( isPathStr('/some/Path') === true );
assert( isPathStr('/some/path?ll=90') === false );
assert( isPathStr('') === false );
assert( isPathStr('sdf/sdf/') === false );
