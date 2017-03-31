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
    value: function(){
      let method, path, fn;
      isPureObject(arguments[0])
      ?(method = arguments[0]['method'],
        path = arguments[0]['path'],
        fn = arguments[0]['fn'])
      :(fn = arguments[arguments.length-1],
        arguments.length === 2 && (isHttpMethod(arguments[0]) ? method = arguments[0]: path = arguments[0]),
        arguments.length === 3 && (path = arguments[1]) && (method = arguments[0])
        );

      if( !isPlainFunction(fn) && !isAsyncFunction(fn) ){  // to-do: add generator function support
        throw new Error('[arguments fn]: App.use expect a middleware which should be a plain function or an async function.');
      }
      path = path || '/';
      method = method || '_ANY';
      if( !isPathStr(path) || (method !==  '_ANY' && !isHttpMethod(method)) ){
        throw new Error('[arguments method/path]: Improper arguments to app.use.');
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

exports = module.exports = proto;
