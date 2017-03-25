exports = module.exports = function(str){
  if(typeof str !== 'string'){
    return false;
  }
  let reg = /^\/[^\s\n\r\?]*$/;
  return reg.test(str);
}
