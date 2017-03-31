exports = module.exports = function(middleware, req){
  let mvMethod = middleware[0];
  if(mvMethod === '_ANY'){
    return true;
  }
  return mvMethod.toLowerCase() === req.method.toLowerCase();
};

