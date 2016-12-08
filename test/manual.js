const eventLoop = require('../lib/main');

eventLoop.start(info => {
    console.log(new Date().toJSON(), info);
});
