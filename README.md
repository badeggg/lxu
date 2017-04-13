# lxu

A web framework based on nodejs.<br>
**@version 0.0.5** Basic core feature is done.

## Philosophy
+ Provides super core middlerware handling and static file service and basicly nothing else
+ Asynchronous programming support with 'express' like api

## Feature
+ Focuse on middleware handling ✔
+ Async/await ✔
+ As a middlerware for other nodejs web framework such as express ✔
+ Generator simulate async/await (support but not recommend) ✔

## Drawback
+ Still in initial phase, *for now* you may only use it in some *non-serious* situation
+ *For now* lxu doesn't accept pull requests 

## Usage
+ install :<br>
  `npm install lxu`
+ require :<br>
  node **v7.6.0** or higher for async function support
+ examples :<br>
  - Start a super simple http server
    ~~~
    //Start a super simple http server
    let lxu = require('lxu');
    let app = lxu();
    app.use((req, res, next)=>{
      res.end('Hello there.');
    });
    app.listen(3000, ()=>{console.log('Listening on 3000...')});
    ~~~
  - Start a http server with static file serve
    ~~~
    //Start a http server with static file serve
    let lxu = require('lxu');
    let app = lxu();
    app.use(lxu.static('./static_file_dir'));
    let server = app.listen(3001, ()=>{console.log(`Listening on ${server.address().port}...`);});
    ~~~
  - Use async middlware
    ~~~
    //Use async middlware
    let lxu = require('lxu');
    let app = lxu();
    app.use('POST', '/some/path', async function(req, res, next){
      // do some stuff...
      let otherServiceResult = await requestOtherService('some_data');
      req.write(otherServiceResult);
      next();
    });
    app.use(async function(req, res, next){
      res.write('End of response.\n');
      res.end();
    });
    app.listen(3002);
    ~~~
  - Use generator simulate async [Link for generator simulate async](https://github.com/badeggg/blog/blob/master/BLOG%231%20Async%20your%20js%20code%20with%20generator%20function/article.md)
    ~~~
    //Use generator simulate async
    let lxu = require('lxu');
    let app = lxu();
    app.use(function* (req, res, next){
      let laterVal = yield later();
      res.write(laterVal);
      next();
    });
    app.use(function(req, res, next){
      res.write('End of response.\n');
      res.end();
      next();
    });
    app.listen(3003);
    ~~~
  - As a middleware for other nodejs web framework
    ~~~
    //As a middleware for other nodejs web framework
    let express = require('express');
    let lxu = require('lxu');
    let app = lxu();
    app.use((req, res, next)=>{
      res.write('Hello there.\n');
      next();
    });
    let expressApp = express();
    expressApp.use(app);
    expressApp.use((req, res, next)=>{
      res.end('After lxu middlewares.\n');
      next();
    });
    let server = expressApp.listen(3004, ()=>{console.log(`Listening on ${server.address().port}...`)});

    ~~~



