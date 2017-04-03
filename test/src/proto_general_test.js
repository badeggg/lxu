const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const proto = require('../../src/proto.js');
const assert = require('assert');
const isPureObject = require('../../lib/isPureObject.js');
const http = require('http');
const fork = require('child_process').fork;

assert( isPureObject(proto) );
assert( proto.use );
assert( proto.consume );
assert( proto.middlewares );
assert( proto.listen );


//Test <use> method
console.log(`Test <use> method`);

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

proto.use(async function(){});
assert( proto.middlewares[3][0] === '_ANY' );
assert( proto.middlewares[3][1] === 'reg.' );
assert( ({}).toString.call( proto.middlewares[3][2] ) === '[object AsyncFunction]' );

proto.use('/test', async function(){});
assert( proto.middlewares[4][0] === '_ANY' );
assert( proto.middlewares[4][1] === '/test' );
assert( ({}).toString.call( proto.middlewares[4][2] ) === '[object AsyncFunction]' );

proto.use('post', async function(){});
assert( proto.middlewares[5][0] === 'post' );
assert( proto.middlewares[5][1] === 'reg.' );
assert( ({}).toString.call( proto.middlewares[5][2] ) === '[object AsyncFunction]' );

try{
  proto.use('oo', async function(){});
}catch(e){
  assert( e.message.includes('[arguments method/path]') );
}

try{
  proto.use('test', async function(){});
}catch(e){
  assert( e.message.includes('[arguments method/path]') );
}

try{
  proto.use({});
}catch(e){
  assert( e.message.includes('[arguments fn]') );
}


