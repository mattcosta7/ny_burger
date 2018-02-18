const express = require('express');
const http = require('http');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');
const { NODE_ENV, PORT, PRODUCTION_ENV } = require('./config');

const app = express();
const server = spdy.createServer(
  {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
  },
  app
);

if (NODE_ENV !== PRODUCTION_ENV) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const config = require('./webpack.config');

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/dist/',
    // hot: true,
    serverSideRender: true,
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackHotServerMiddleware(compiler, {
    chunkName: 'server',
  }));
} else {
  const CLIENT_ASSETS_DIR = path.join(__dirname, './dist');
  const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, 'stats.json');
  const SERVER_RENDERER_PATH = path.join(__dirname, './dist/server');
  const serverRendererBuilder = require(SERVER_RENDERER_PATH).default;
  const stats = require(CLIENT_STATS_PATH);
  const compression = require('compression');

  const serverRenderer = serverRendererBuilder({
    clientStats: {
      ...stats,
    },
  });

  app.use(compression());
  app.set('views', path.join(__dirname, 'dist'));
  app.set('view engine', 'ejs');
  app.use('/assets', express.static(path.resolve(path.join(__dirname, 'dist'))));

  app.use(serverRenderer);
}

http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host.replace(8080, PORT)}${req.url}`,
    });
    res.end();
  })
  .listen(8080);

server.listen(PORT, () => `listening on port: ${PORT}`);
