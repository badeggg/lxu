const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const proto = require('../../src/proto.js');
const assert = require('assert');
const isPureObject = require('../../lib/isPureObject.js');
const http = require('http');

//Test <consume> method
//basic feature test
console.log(`Test <consume> basic feature`);

process.kill(process.pid);
proto.middlewares.length = 0;

proto.use((req, res, next)=>{
  res.write(`'hi' from 1st middleware\n`);
  next();
});
proto.use((req, res, next)=>{
  res.write(`'hi' from 2nd middleware`);
  next();
});
proto.use((req, res, next)=>{
  res.end();
  next();
});
proto.use(()=>{
  server.close();
  sockets.forEach((s)=>{
    s.destroy();
  });
});

let sockets = [];
let server = proto.listen(9898);
server.on('connection', (socket)=>{
  sockets.push(socket);
});

let clientReq = http.request({port: 9898}, (res)=>{
  let body = '';
  res.on('data', (chunk)=>{
    body += chunk; // I can't understand what's happening in this line of code.
  });
  res.on('end', ()=>{
    assert(body === `'hi' from 1st middleware\n'hi' from 2nd middleware`);
  });
});

clientReq.end();



