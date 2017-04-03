const isPureObject = require('../../lib/isPureObject');
const isPathStr = require('../../lib/isPathStr.js');

exports = module.exports = function(path){
  if(isPureObject(path)){
    return isLxuPathStr(path.path);
  }
  return isLxuPathStr(path);
};

function isLxuPathStr(path){
  if(typeof path !== 'string'){
    return false;
  }
  return isPathStr(path) || path.startsWith('reg') || path.startsWith('ireg');
}
