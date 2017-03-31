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
});
_testConnect.client({method: 'get', path: '/'});

// server = _testConnect.server((req, res)=>{
//   assert(isMiddlewareMatch(mv2, req) === true);
// });
// _testConnect.client({method: 'Post', path: '/test/path'});
// server.destroy();

// server = _testConnect.server((req, res)=>{
//   assert(isMiddlewareMatch(mv3, req) === true);
// });
// _testConnect.client({method: 'get', path: 'test/path'});
// server.destroy();

// server = _testConnect.server((req, res)=>{
//   assert(isMiddlewareMatch(mv4, req) === true);
// });
// _testConnect.client({method: 'post', path: '/test/path/'});
// server.destroy();
// console.log('lll');
