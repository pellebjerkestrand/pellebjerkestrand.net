/* eslint-env node */
// NOTE: This file exists because of https://stackoverflow.com/a/45650434. It was the only way I could get ES6 Webpack configuration to work properly.
require('babel-register');
module.exports = require('./webpack.config.babel');
