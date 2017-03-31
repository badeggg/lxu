exports = module.exports = function(req){
  let parsed = {};
  let pathReg = /^(\/[^\?]*)[\?]?/;
  parsed.path = getPath();
  parsed.args = getArgs();

  return parsed;

  function getPath(){
    let url = req.url;
    let path = url.match(pathReg)[1];
    path.length > 1 && path[path.length-1] === '/' && (path = path.slice(0, -1));
    return path;
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
