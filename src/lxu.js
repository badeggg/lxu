/*!{7006d272cd4a48ad521450def8ae4f4066ef2046}
 * lxu
 * MIT Licensed
 * @badeggg   @2017-04-11 21:25:03.254840
 */

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
