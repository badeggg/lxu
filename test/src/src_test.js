const pathBasename = require('path').basename;
console.log(`-folder--------------${pathBasename(__filename)}`);

const fork = require('child_process').fork;

fork(`${__dirname}/component/component_test.js`);

fork(`${__dirname}/_testConnect.js`);
fork(`${__dirname}/lxu_test.js`);
fork(`${__dirname}/proto_consume_async_test.js`);
fork(`${__dirname}/proto_consume_general_test.js`);
fork(`${__dirname}/proto_consume_generator_test.js`);
fork(`${__dirname}/proto_general_test.js`);
