exports = module.exports = function(middleware, req){
  return middleware.method.toLowerCase() === reqMethod.toLowerCase();
};

