if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  test: {
    username: process.env.DB_USER,
    password: null,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "sqlite3"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: process.env.DB_DIALECT
  }
};
