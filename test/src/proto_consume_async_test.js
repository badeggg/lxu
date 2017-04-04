const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const proto = require('../../src/proto.js');
const assert = require('assert');
const isPureObject = require('../../lib/isPureObject.js');
const http = require('http');

//Test <consume> method
//async/await function test
console.log(`Test <consume> async/await feature`);

let laterCI = 0;
let later = function(){
  return new Promise((resolve, reject)=>{
    laterCI++;
    setTimeout(()=>{
      resolve(`: ${laterCI} second later value`);
    }, 1000);
  });
};
proto.use(async function(req, res, next){
  let laterVal = await later();
  res.write(laterVal);
  next();
});
proto.use(async (req, res, next)=>{
  let laterVal = await later();
  res.write(laterVal);
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
let server = proto.listen(9899);
server.on('connection', (socket)=>{
  sockets.push(socket);
});

let clientReq = http.request({port: 9899}, (res)=>{
  let body = '';
  res.on('data', (chunk)=>{
    body += chunk;
  });
  res.on('end', ()=>{
    assert(body === `: 1 second later value: 2 second later value`);
  });
});

clientReq.end();

