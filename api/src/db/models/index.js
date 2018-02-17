const Sequelize = require("sequelize");
const configs = require("../config/config");

const env = process.env.NODE_ENV || "development";
const config = configs[env];
const db = {};

let sequelize;
if (process.env.NODE_ENV !== "production") {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: process.env.DB_DIALECT,
    protocol: process.env.DB_DIALECT,
    logging: true
  });
}

[].forEach(modelMaker => {
  const model = modelMaker(sequelize, Sequelize);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
