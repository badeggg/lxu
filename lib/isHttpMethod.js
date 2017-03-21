const httpMethods = require('./httpMethods');

exports = module.exports = function(str){
  str = str.toUpperCase();
  return httpMethods.includes(str);
};
