var path = require('path');
global.appRoot = path.resolve(__dirname);

require = require("esm")(module /*, options*/);
module.exports = require("./server/server.js");
