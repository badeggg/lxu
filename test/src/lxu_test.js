const pathBasename = require('path').basename;
console.log(`${pathBasename(__filename)}`);

const lxu = require('../../src/lxu.js');
const assert = require('assert');

let app = lxu();

assert( ({}).toString.call(lxu) === '[object Function]' );
assert( ({}).toString.call(lxu) === '[object Function]' );
assert( app.use );
assert( app.consume );
assert( app.middlewares );
assert( app.listen );

app.use((req, res)=>{
  res.end('Hello there.');
});
app.listen(9898);

