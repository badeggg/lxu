/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

exports = module.exports = function(middleware, req){
  let mvMethod = middleware[0];
  if(mvMethod === '_ANY'){
    return true;
  }
  return mvMethod.toLowerCase() === req.method.toLowerCase();
};

