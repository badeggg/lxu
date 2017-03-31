exports = module.exports = function(middleware, req){
  return middleware[0].toLowerCase() === req.method.toLowerCase();
};

