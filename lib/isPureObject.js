/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

// Definition of "pure object":
// object that is not array nor function

const _getClassString = require('./_getClassString');

exports = module.exports = function(obj){
  return _getClassString(obj) === 'object';
};
