const path = require('path');
const nodeExternals = require('webpack-node-externals');
const rulesMaker = require('./webpack/rules');

const makePluginSet = require('./webpack/plugins');

const outputPath = path.resolve('./dist');
const publicPath = '/assets/';
const resolve = {
  extensions: ['.js', '.jsx'],
};

const clientConfig = {
  name: 'client',
  entry: {
    bundle: [
      'babel-polyfill',
      process.env.NODE_ENV !== 'production' &&
        `webpack-hot-middleware/client?name=client&&path=https://localhost:${
          process.env.PORT
        }/__webpack_hmr`,
      './src/entry/client',
    ].filter(Boolean),
  },
  output: {
    path: outputPath,
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkHash].js' : '[name].js',
    publicPath,
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: rulesMaker({ server: false }),
  },
  resolve,
  plugins: makePluginSet('client'),
};

const serverConfig = {
  name: 'server',
  entry: {
    server: ['babel-polyfill', './src/server'].filter(Boolean),
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath,
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: rulesMaker({ server: true }),
  },
  resolve,
  plugins: makePluginSet('server'),
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: true,
    __filename: true,
  },
  context: path.resolve(__dirname),
};

module.exports = [clientConfig, serverConfig];
