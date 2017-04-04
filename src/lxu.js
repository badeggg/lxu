'use strict';

const proto = require('./proto');
const mixin = require('merge-descriptors');

exports = module.exports = createApplication;

function createApplication(){
  async function app(req, res, next){
    await app.consume(req, res);
    next && next();
    return 0;
  };
  mixin(app, proto);
  return app;
}

exports.static = require('serve-static');
