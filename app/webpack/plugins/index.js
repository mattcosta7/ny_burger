const webpack = require('webpack');
const { extractPluginMaker } = require('./extract-text-plugin');
const uglify = require('./uglify');
const pwaManifest = require('./pwa-manifest');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const { PORT, NODE_ENV } = require('../../config');

const pluginSets = {
  client: {
    development: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      extractPluginMaker({ disable: true }),
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.PORT': PORT,
      }),
      pwaManifest,
    ],
    production: [
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      extractPluginMaker({ production: true }),
      uglify(),
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.PORT': PORT,
      }),
      new StatsWriterPlugin({
        filename: 'stats.json', // Default
        fields: null,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ resource }) => /node_modules/.test(resource),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      pwaManifest,
    ],
  },
  server: {
    development: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      extractPluginMaker(),
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.PORT': PORT,
      }),
      pwaManifest,
    ],
    production: [
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      extractPluginMaker({ production: true }),
      uglify(),
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.PORT': PORT,
      }),
      pwaManifest,
    ],
  },
};

module.exports = (type) => {
  const env = process.env.NODE_ENV || 'development';
  if (!pluginSets[type]) {
    throw new Error('Invalid type for plugin set');
  } else if (!pluginSets[type][env]) {
    throw new Error('Invalid environment for plugin set');
  }

  return pluginSets[type][env];
};
