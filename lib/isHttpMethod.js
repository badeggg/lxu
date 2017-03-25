const httpMethods = require('methods');

exports = module.exports = function(str){
  str = str.toLowerCase();
  return httpMethods.includes(str);
};
