const path = require('path');
const nodeExternals = require('webpack-node-externals');
const rulesMaker = require('./webpack/rules');

const makePluginSet = require('./webpack/plugins');

const outputPath = path.resolve('./dist');
const publicPath =
  process.env.NODE_ENV !== 'production' ? '/public/' : 'https://cdn.nyburgerblog.com/';
const resolve = {
  extensions: ['.js', '.jsx'],
};

const clientConfig = {
  name: 'client',
  entry: {
    bundle: [
      'babel-polyfill',
      process.env.NODE_ENV !== 'production' &&
        `webpack-hot-middleware/client?name=client&&path=http://localhost:${
          process.env.CLIENT_PORT
        }/__webpack_hmr`,
      './src/entry/client',
    ].filter(Boolean),
  },
  output: {
    path: outputPath,
    filename:
      process.env.NODE_ENV === 'production' ? 'scripts/[name].[chunkHash].js' : 'scripts/[name].js',
    publicPath,
    sourceMapFilename: 'sourceMaps/[file].map',
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: rulesMaker({ server: false }),
  },
  resolve,
  plugins: makePluginSet('client'),
  node: {
    fs: 'empty',
  },
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
    sourceMapFilename: 'sourceMaps/[file].map',
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
