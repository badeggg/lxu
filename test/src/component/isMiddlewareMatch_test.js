const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const _testConnect = require('../_testConnect.js');
const assert = require('assert');

const isMiddlewareMatch = require('../../../src/component/isMiddlewareMatch.js');


let mv1 = ['get', '/', ()=>{}];
let server1 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv1, req) === true);
  server1.destroy();
}, 9091);
_testConnect.client({method: 'get', path: '/', port: 9091});

let mv2 = ['post', 'test/path', ()=>{}];
let server2 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv2, req) === false);
  server2.destroy();
}, 9092);
_testConnect.client({method: 'post', path: '/test/path', port: 9092});

let mv3 = ['Get', '/test/path/', ()=>{}];
let server3 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv3, req) === true);
  server3.destroy();
}, 9093);
_testConnect.client({method: 'get', path: '/test/path', port: 9093});

let mv4 = ['POST', 'test/path', ()=>{}];
let server4 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv4, req) === false);
  server4.destroy();
}, 9094);
_testConnect.client({method: 'post', path: '/test/path/', port: 9094});

let mv5 = ['_ANY', '/test/path', ()=>{}];
let server5 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv5, req) === true);
  server5.destroy();
}, 9095);
_testConnect.client({method: 'post', path: '/test/path/', port: 9095});

