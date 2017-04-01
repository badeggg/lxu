function genasync(genFunction){
  return function(){
    let args = arguments;
    let generator = genFunction.apply(undefined, arguments);

    function handle(resdVal){
      let yieldObj = generator.next(resdVal);
      let thread = yieldObj.value;
      let done = yieldObj.done;
      if( thread && isPromise(thread) ){
        if(!done){
          thread.then((value)=>{
            resdVal = value;
            handle(resdVal);
          }, (reason)=>{
            throw new Error(reason);
          });
        } else{
          return thread;
        }

      } else{
        if(!done){ //In case the coder who use this 'genasync' function is not using it gentaly.  
          resdVal = thread;
          handle(resdVal);
        } else{
          return Promise.resolve(thread);
        }
      }

    }

    return handle();
  };
}

function isPromise(obj){
  return !!(Object.prototype.toString.call(obj).toLowerCase() === '[object promise]' || obj.then);
}

module.exports = exports = genasync;


