const _getClassString = require('./_getClassString');

exports = module.exports = function(obj){
  return _getClassString(obj) === 'function';
};

