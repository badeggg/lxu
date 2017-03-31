const isPureObject = require('../../lib/isPureObject');
const parseUrl = require('./parseUrl');

exports = module.exports = function(middleware, req){
  let caseSensitive = false;
  let path = middleware[1];
  let reqPath = parseUrl(req).path;
  if( isPureObject(path) ){
    caseSensitive = path.caseSensitive;
    path = path.value;
  }
  if(caseSensitive){
    return path === reqPath;
  }
  return path.toLowerCase() === reqPath.toLowerCase();
};
