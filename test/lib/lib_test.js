const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

require('./_getClassString_test.js');
require('./isArray_test.js');
require('./isAsyncFunction.js');
require('./isHttpMethod_test.js');
require('./isPathStr_test.js');
require('./isPlainFunction_test.js');
require('./isPureObject_test.js');
require('./isGeneratorFunction_test.js');
require('./genTransAsync_test.js');
