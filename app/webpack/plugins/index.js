const webpack = require('webpack');
const { extractPluginMaker } = require('./extract-text-plugin');
const uglify = require('./uglify');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const pwaManifest = require('./pwa-manifest');
const ManifestPlugin = require('webpack-manifest-plugin');
const { PORT, NODE_ENV } = require('../../config');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

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
      new HTMLWebpackPlugin({ template: 'src/index.html', alwaysWriteToDisk: true }),
      new HtmlWebpackHarddiskPlugin(),
      pwaManifest,
      new InlineManifestWebpackPlugin(),
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
      new HTMLWebpackPlugin({ template: 'src/index.html', alwaysWriteToDisk: true }),
      new HtmlWebpackHarddiskPlugin(),
      pwaManifest,
      new InlineManifestWebpackPlugin(),
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
