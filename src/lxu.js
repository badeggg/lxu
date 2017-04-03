'use strict';

const proto = require('./proto');

exports = module.exports = createApplication;

function createApplication(){
  let app = function(req, res, next){ //Todo: lxu should can be a middleware for other web framework such as express

  };
  app.__proto__ = proto;
  return app;
}

exports.static = require('serve-static');
