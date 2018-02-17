const Sequelize = require('sequelize');
const dbConfigs = require('../config/config');
const { NODE_ENV } = require('../../config');

const dbConfig = dbConfigs[NODE_ENV];
const db = {};

const burger = require('./burger');
const restaurant = require('./restaurant');

const models = [burger, restaurant];

let sequelize;
if (NODE_ENV !== 'production') {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.DATABASE_URL, {
    dialect: dbConfig.DB_DIALECT,
    protocol: dbConfig.DB_DIALECT,
    logging: true,
  });
}

models.forEach((modelMaker) => {
  const model = modelMaker(sequelize, Sequelize);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
