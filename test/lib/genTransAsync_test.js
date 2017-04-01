const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const genTransAsync = require('../../lib/genTransAsync.js');
const assert = require('assert');

let later = function(){
  return new Promise((res, rej)=>{
    setTimeout(()=>{res(`Resolved value: ${Math.floor(Math.random()*10000)}`)}, 500);
  });
};
function* genF(){
  let resVal1 = yield later();
  console.log('1st resolved value: ', resVal1);
  let resVal2 = yield later();
  console.log('2nd resolved value: ', resVal2);
}
genTransAsync(genF)();
