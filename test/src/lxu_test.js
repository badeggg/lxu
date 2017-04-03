const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const lxu = require('../../src/lxu.js');
const assert = require('assert');
const http = require('http');

let app = lxu();

assert( ({}).toString.call(lxu) === '[object Function]' );
assert( ({}).toString.call(lxu) === '[object Function]' );
assert( app.use );
assert( app.consume );
assert( app.middlewares );
assert( app.listen );

app.use((req, res, next)=>{
  console.log('Hello there.');
  next();
});
app.use(lxu.static('./component/'));

let server = app.listen(8000);

http.request({port: 8000, path: '/isLxuPath_test.js'}, (res)=>{
  let body = '';
  res.on('data', (chunk)=>{
    body += chunk;
  });
  res.on('end', ()=>{
    console.log(body);
  });
  res.on('error', (e)=>{
    throw e;
  });
}).end();
