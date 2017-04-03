// Used to test connection related module.
// Create a server, close a server and destroy all sockets.

const http = require('http');
const mixin = require('merge-descriptors');


class Server{
  constructor(handle, port){
    this._s = http.createServer((req, res)=>{
      res.write('hello there.');
      res.end();
      handle(req, res);
    });
    this.sockets = [];
    let that = this;
    this._s.on('connection', function(socket){
      that.sockets.push(socket);
    });
    port = port || 9090;
    this._s.listen(port);
  }
  destroy(){
    this._s.close(()=>{});
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
    this.req = http.request(options, (res) => {
      let str = '';
      res.on('data', (chunk)=>{
        str += chunk;
      });
    });
    this.req.on('error', (e)=>{console.log(e.message);});
    this.req.end();
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


