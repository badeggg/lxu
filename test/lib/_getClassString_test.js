const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const _getClassString = require('../../lib/_getClassString');
const assert = require('assert');

assert( _getClassString('xuxu') === 'string' );
assert( _getClassString([]) === 'array' );
assert( _getClassString(function(){}) === 'function' );
assert( _getClassString(function* (){}) === 'generatorfunction' );
assert( _getClassString(class{}) === 'function' );
assert( _getClassString(async function(){}) === 'asyncfunction' );
assert( _getClassString({}) === 'object' );
