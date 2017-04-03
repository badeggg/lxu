const isPureObject = require('../../lib/isPureObject');
const parseUrl = require('./parseUrl');

exports = module.exports = function(middleware, req){
  let caseSensitive = false;
  let path = middleware[1];
  let reqPath = parseUrl(req).path;

  if(typeof path === 'string' && (path.startsWith('ireg') || path.startsWith('reg'))){ //Regular expression match path
    path.startsWith('reg')
      ? path = new RegExp(path.slice(3))
      : path = new RegExp(path.slice(4), 'i')
    return path.test(reqPath);

  } else{ //Plain string match
    if( isPureObject(path) ){
      caseSensitive = path.caseSensitive;
      path = path.path;      
    }
    path[path.length-1] !== '/' && (path = path + '/');
    reqPath[reqPath.length-1] !== '/' && (reqPath = reqPath + '/');
    if(caseSensitive){
      return path === reqPath;
    }
    return path.toLowerCase() === reqPath.toLowerCase();
  }
};
