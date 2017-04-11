const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const lxu = require('../../src/lxu.js');
const assert = require('assert');
const http = require('http');
const express = require('express');

let app = lxu();
app.use((req, res, next)=>{
  res.write('Hello there.\n');
  next();
});
let expressApp = express();
expressApp.use(app);
expressApp.use((req, res, next)=>{
  res.end('After lxu middlewares.\n');
  next();
});
let server = expressApp.listen(8002);

let clientReg = http.request({port: 8002}, (res)=>{
  let body = '';
  res.on('data', (chunk)=>{
    body += chunk;
  });
  res.on('end', ()=>{
    assert(body === 'Hello there.\nAfter lxu middlewares.\n');
    server.close();
  });
  res.on('error', (e)=>{
    throw e;
  });
}).end();

