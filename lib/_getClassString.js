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
