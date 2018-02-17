const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({ sourceMap = true } = {}) =>
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap,
    uglifyOptions: {},
    extractComments: false,
  });
