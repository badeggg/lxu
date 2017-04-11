/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

exports = module.exports = getClassString;

function getClassString(obj){
  let verboseStr = Object.prototype.toString.call(obj);
  return _getClassFromVerbose(verboseStr);
}

function _getClassFromVerbose(verboseStr){
  verboseStr = verboseStr.toLowerCase();
  let reg = /^\[\w+\s+(\w+)\]$/;
  return verboseStr.match(reg)[1];
}
