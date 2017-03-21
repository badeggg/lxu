// Definition of "pure object":
// object that is not array nor function

const _getClassString = require('./_getClassString');

exports = module.exports = function(obj){
  return _getClassString(obj) === 'object';
};
