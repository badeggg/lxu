// Used to test connection related module.
// Create a server, close a server and destroy all sockets.

const http = require('http');
const mixin = require('merge-descriptors');


class Server{
  constructor(handle, port){
    this.__proto__.__proto__ = http.createServer((req, res)=>{
      handle(req, res);
      res.write('hello there.');
    });
    this.sockets = [];
    this.on('connection', function(socket){
      this.sockets.push(socket);
    });
    port = port || 9090;
    this.listen(port);
  }
  destroy(){
    this.close(()=>{console.log('只是想安安静静地写代码');});
    this.sockets.forEach((s)=>{s.destroy()});
  }
}

class Client{
  constructor(options){
    options = options || {};
    this.defaultOptions = {
      hostname: '127.0.0.1',
      port: 9090,
      path: '/test/path',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36'

      }
    };
    this.options = mixin(options, this.defaultOptions, false);
    try{
    this.__proto__.__proto__ = this.req = http.request(options, (res) => {});
    this.req.end();
    }catch(e){}
  }
}

module.exports = exports = _testConnect = {
  server: function(handle, port){
    return new Server(handle, port);
  },
  client: function(options){
    return new Client(options);
  }
};


