const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const isGeneratorFunction = require('../../lib/isGeneratorFunction.js');
const assert = require('assert');

assert( isGeneratorFunction(async function(){}) === false );
assert( isGeneratorFunction(function* (){}) === true );
