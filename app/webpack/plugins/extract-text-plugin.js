const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPluginMaker = ({ disable = false, production = false } = {}) =>
  new ExtractTextPlugin({
    filename: production ? 'styles/styles.[contentHash].css' : 'styles/styles.css',
    allChunks: true,
    disable,
  });

const extractTextPluginRule = config => ExtractTextPlugin.extract(config);

module.exports = {
  extractTextPluginRule,
  extractPluginMaker,
};
