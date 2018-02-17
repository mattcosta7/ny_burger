if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { PORT, NODE_ENV, DB_USER, DB_NAME, DB_HOST, DB_DIALECT } = process.env;

const PRODUCTION_ENV = "production";
const DEVELOPMENT_ENV = "development";

module.exports = {
  PORT,
  NODE_ENV,
  DB_USER,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
  PRODUCTION_ENV,
  DEVELOPMENT_ENV: "development"
};
