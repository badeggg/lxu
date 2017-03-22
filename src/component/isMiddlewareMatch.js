const isMethodMatch = require('/isMethodMatch');
const isPathMatch = require('./isPathMatch');

exports = module.exports = function(middleware, req){
  return isMethodMatch(middleware, req) && isPathMatch(middleware, req);
};
