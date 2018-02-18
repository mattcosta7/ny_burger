module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.query(`
      CREATE EXTENSION Postgis;
    `),
  down: (queryInterface, Sequelize) =>
    queryInterface.sequelize.query(`
      DROP EXTENSION Postgis;
    `),
};
