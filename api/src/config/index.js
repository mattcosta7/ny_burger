if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {
  SERVER_PORT, NODE_ENV, DB_USER, DB_NAME, DB_HOST, DB_DIALECT, DATABASE_URL,
} = process.env;

const PRODUCTION_ENV = 'production';
const DEVELOPMENT_ENV = 'development';

const IMAGES_SIZES = {
  THUMB: 'THUMB',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  X_LARGE: 'X_LARGE',
};

module.exports = {
  SERVER_PORT,
  NODE_ENV,
  DB_USER,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
  PRODUCTION_ENV,
  DEVELOPMENT_ENV: 'development',
  IMAGES_SIZES,
  DATABASE_URL,
};
