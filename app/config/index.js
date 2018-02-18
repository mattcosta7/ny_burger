if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('dotenv').config();
}

const { NODE_ENV, PORT } = process.env;

const PRODUCTION_ENV = 'production';
const DEVELOPMENT_ENV = 'development';

module.exports = {
  NODE_ENV,
  PORT,
  PRODUCTION_ENV,
  DEVELOPMENT_ENV,
};
