const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const _testConnect = require('../_testConnect.js');
const assert = require('assert');

const isMiddlewareMatch = require('../../../src/component/isMiddlewareMatch.js');

let mv1 = ['get', '/', ()=>{}];
let mv2 = ['post', '/test/path', ()=>{}];
let mv3 = ['Get', '/test/path/', ()=>{}];
let mv4 = ['POST', 'test/path', ()=>{}];

let server = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv1, req) === true);
  server.destroy();
}, 9091);
_testConnect.client({method: 'get', path: '/', port: 9091});

server = _testConnect.server((req, res)=>{
  //console.log(isMiddlewareMatch(mv2, req));
  //assert(isMiddlewareMatch(mv2, req) === true);
  server.destroy();
}, 9092);
_testConnect.client({method: 'post', path: '/test/path', port: 9092});

// server = _testConnect.server((req, res)=>{
//   assert(isMiddlewareMatch(mv3, req) === true);
//   server.destroy();
// }, 9093);
// _testConnect.client({method: 'get', path: 'test/path', port: 9093});

// server = _testConnect.server((req, res)=>{
//   assert(isMiddlewareMatch(mv4, req) === true);
//   server.destroy();
// }, 9094);
// _testConnect.client({method: 'post', path: '/test/path/', port: 9094});
