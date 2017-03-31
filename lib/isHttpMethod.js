const httpMethods = require('methods');

exports = module.exports = function(str){
  if(typeof str !== 'string'){
    return false;
  }
  str = str.toLowerCase();
  return httpMethods.includes(str);
};
