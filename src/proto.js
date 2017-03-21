const isPureObject = require('../lib/isPureObject');
const isHttpMethod = require('../lib/isHttpMethod');
const isPlainFunction = require('../lib/isPlainFunction');
const isAsyncFunction = require('../lib/isAsyncFunction');
const isPathStr = require('../lib/isPathStr');

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
    //this part is wrong!!!
    value: function(req, res){
      let fn = this.middlewares.shift();
      while(this.middlewares.length >= 1){
        let nextFn = this.middlewares.shift();
        function next(){
          nextFn(req, res, next);
        }
        fn(req, res, next);
      }
    }
  },
  middlewares: {
    value: [],
  },

};

let proto = Object.defineProperties({}, properties);
