const config = require('../../config');

module.exports = {
  development: {
    username: config.DB_USER,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
  },
  test: {
    username: config.DB_USER,
    password: null,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: 'sqlite3',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: config.DB_DIALECT,
    DATABASE_URL: config.DATABASE_URL,
  },
};
