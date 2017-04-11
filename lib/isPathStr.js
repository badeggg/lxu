/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

exports = module.exports = function(str){
  if(typeof str !== 'string'){
    return false;
  }
  let reg = /^\/[^\s\n\r\?]*$/;
  return reg.test(str);
}
