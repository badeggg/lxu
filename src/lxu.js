'use strict';

const proto = require('./proto');

exports = module.exports = createApplication;

function createApplication(){
  let app = function(req, res, next){

  };
  app.__proto__ = proto;
  return app;
}
