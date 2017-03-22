exports = module.exports = function(req){
  let parsed = {};
  let pathReg = /^(\/[^\?]*)[\?]?/;
  parsed.path = getPath();
  parsed.args = getArgs();

  return parsed;

  function getPath(){
    let url = req.url;
    return url.match(pathReg)[1];
  }

  function getArgs(){
    let url = req.url;
    let argsStr = url.replace(pathReg, '');
    let argsArr = argsStr.split('&');
    let args = {};

    argsArr.forEach((argStr) => {
      let kv = argStr.split('=');
      if(kv.length === 2){
        args[kv[0]] = kv[1];
      }
    });
    return args;
  }

};
