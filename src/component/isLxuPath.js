/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

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
