const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const proto = require('../../src/proto.js');
const assert = require('assert');
const isPureObject = require('../../lib/isPureObject.js');

assert( isPureObject(proto) );
assert( proto.use );
assert( proto.consume );
assert( proto.middlewares );
assert( proto.listen );


//test [use] method
proto.use('get', '/', ()=>{});
assert( proto.middlewares[0][0] === 'get' );
assert( proto.middlewares[0][1] === '/' );
assert( typeof proto.middlewares[0][2] === 'function' );

proto.use('', '/test/path/', ()=>{});
assert( proto.middlewares[1][0] === '_ANY' );
assert( proto.middlewares[1][1] === '/test/path/' );
assert( typeof proto.middlewares[1][2] === 'function' );

proto.use('post', '/', async function(){});
assert( proto.middlewares[2][0] === 'post' );
assert( proto.middlewares[2][1] === '/' );
assert( ({}).toString.call( proto.middlewares[2][2] ) === '[object AsyncFunction]' );

