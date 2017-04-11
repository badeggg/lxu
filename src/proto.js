/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

const isPureObject = require('../lib/isPureObject');
const isHttpMethod = require('../lib/isHttpMethod');
const isPlainFunction = require('../lib/isPlainFunction');
const isAsyncFunction = require('../lib/isAsyncFunction');
const isLxuPath = require('./component/isLxuPath.js');
const isMiddlewareMatch = require('./component/isMiddlewareMatch');
const genTransAsync = require('../lib/genTransAsync.js');
const isGeneratorFunction = require('../lib/isGeneratorFunction.js');
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

      if( !isPlainFunction(fn) && !isAsyncFunction(fn) && !isGeneratorFunction(fn) ){
        throw new Error('[arguments fn]: App.use expect a middleware which should be a plain function or an async function.');
      }
      path = path || 'reg.';
      method = method || '_ANY';
      if( !isLxuPath(path) || (method !==  '_ANY' && !isHttpMethod(method)) ){
        throw new Error('[arguments method/path]: Improper arguments to app.use.');
      }
      if( isGeneratorFunction(fn) ){
        fn = genTransAsync(fn);
      }
      this.middlewares.push([method, path, fn]);

    },
  },
  consume: {
    value: async function(req, res){
      let nextIndex = 0;
      return await next();
      async function next(){
        if(nextIndex >= proto.middlewares.length){
          return 0;
        }
        let nextMiddleware = proto.middlewares[nextIndex++];
        nextMiddleware && isMiddlewareMatch(nextMiddleware, req)
          ? await nextMiddleware[2](req, res, next)
          : await next();
        return 0;
      }
    }
  },
  middlewares: {
    /**
     * middleware: [method, path, fn]
     * A middleware example ['get', '/', ()=>{}]
     */
    value: [],
  },
  listen: {
    value: function(port){
      let server = http.createServer(this.consume);
      server.listen(port);
      return server;
    }
  },

};

let proto = Object.defineProperties({}, properties);

exports = module.exports = proto;
