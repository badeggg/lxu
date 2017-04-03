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

let mv6 = ['_ANY', 'reg', ()=>{}];
let server6 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv6, req) === true);
  server6.destroy();
}, 9096);
_testConnect.client({method: 'post', path: '/test/path/', port: 9096});

let mv7 = ['_ANY', 'reg/test/pAth', ()=>{}];
let server7 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv7, req) === false);
  server7.destroy();
}, 9097);
_testConnect.client({method: 'post', path: '/test/path/', port: 9097});

let mv8 = ['_ANY', 'ireg/test/pAth', ()=>{}];
let server8 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv8, req) === true);
  server8.destroy();
}, 9098);
_testConnect.client({method: 'post', path: '/test/path/', port: 9098});

let mv9 = ['_ANY', 'ireg/test.*', ()=>{}];
let server9 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv9, req) === true);
  server9.destroy();
}, 9099);
_testConnect.client({method: 'post', path: '/test/path/', port: 9099});

let mv10 = ['_ANY', {caseSensitive: false, path: '/teSt/path/'}, ()=>{}];
let server10 = _testConnect.server((req, res)=>{
  assert(isMiddlewareMatch(mv10, req) === true);
  server10.destroy();
}, 9100);
_testConnect.client({method: 'post', path: '/test/path/', port: 9100});

