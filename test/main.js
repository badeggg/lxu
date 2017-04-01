const fork = require('child_process').fork;

fork(`${__dirname}/src/proto_general_test.js`);
fork(`${__dirname}/src/lxu_test.js`);
fork(`${__dirname}/src/component/isMiddlewareMatch_test.js`);
fork(`${__dirname}/lib/lib_test.js`);
