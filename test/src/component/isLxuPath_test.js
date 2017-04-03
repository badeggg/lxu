const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isLxuPath = require('../../../src/component/isLxuPath.js');
const assert = require('assert');

assert(isLxuPath('reg'));
assert(isLxuPath('ireg'));
assert(isLxuPath('reg\d'));
assert(isLxuPath('iregasdfa'));
assert(isLxuPath({path: 'reg'}));
assert(isLxuPath({path: 'reg', caseSensitive: false}));
assert(isLxuPath({}) === false);
assert(isLxuPath({value: 23}) === false);
assert(isLxuPath('sdf') === false);
assert(isLxuPath('ref') === false);




