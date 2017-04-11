/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

const isMethodMatch = require('./isMethodMatch');
const isPathMatch = require('./isPathMatch');

exports = module.exports = function(middleware, req){
  return isMethodMatch(middleware, req) && isPathMatch(middleware, req);
};
