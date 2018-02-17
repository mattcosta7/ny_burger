const express = require('express');
const compression = require('compression');
const apiRoutes = require('./routes/api');
const apiCors = require('./middleware/cors');
const morgan = require('morgan');
const { logger } = require('./lib');
const cors = require('cors');
const { apiOpts } = require('./middleware/cors');

const app = express();

app.use(require('morgan')('combined', { stream: logger.stream }));

app.use(compression());

app.use('/api', cors(apiOpts), apiRoutes);

app.get('/', (req, res) => {
  res.json({ welcome: 'hello world' });
});

app.use((req, res, next) => {
  logger.error('404 page requested');
  res.status(404).send('This page does not exist!');
});

module.exports = app;
