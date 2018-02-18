module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('ModelImages', [
      {
        modelName: 'Burger',
        modelId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ModelImages', null, {}),
};
