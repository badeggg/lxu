const isPureObject = require('../lib/isPureObject');
const isHttpMethod = require('../lib/isHttpMethod');
const isPlainFunction = require('../lib/isPlainFunction');
const isAsyncFunction = require('../lib/isAsyncFunction');
const isPathStr = require('../lib/isPathStr');
const isMiddlewareMatch = require('./component/isMiddlewareMatch');
const http = require('http');

let properties = {
  use: {
    /**
     * Parameters pattern:
     * ([method,][path,]fn) or object-argument
     */
    value: function(method, path, fn){
      isPureObject(arguments[0])
      ?(method = arguments[0]['method'] || 'GET',
        path = arguments[0]['path'] || '/',
        fn = arguments[0]['fn'])
      :(fn = arguments[arguments.length-1]
        arguments.length === 3 && (path = arguments[1] || '/') && (method = argumnets[0] || 'GET'),
        arguments.length === 2 && (isHttpMethod(arguments[0]) ? method = arguments[0]: path = arguments[0]) || '/'
        );

      if( !isPlainFunction(fn) && !isAsyncFunction(fn) ){
        throw new Error('app.use expect a middleware which should be a plain function or an async function.');
      }
      if( (path && !isPathStr(path)) || (method && !isHttpMethod(method)) ){
        throw new Error('Improper arguments to app.use.');
      }
      this.middlewares.push([method, path, fn]);

    },
  },
  consume: {
    value: async function(req, res){
      let middleware = this.middlewares.shift();
      middleware && isMiddlewareMatch(middleware, req) && middleware.fn(req, res, next);
      function next(){
        let nextMiddleware = this.middlewares.shift();
        nextMiddleware && isMiddlewareMatch(nextMiddleware, req) && nextMiddleware.fn(req, res, next);
      }
    }
  },
  middlewares: {
    value: [],
  },
  listen: {
    value: function(port){
      let server = http.createServer(this.consume);
      server.listen(port);
    }
  },

};

let proto = Object.defineProperties({}, properties);

exports = modules.exports = proto;
