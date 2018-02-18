module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Burgers', [
      {
        name: 'The best burger',
        meatType: 'awesome beef',
        bunType: 'potato',
        description: 'burger descriptor',
        restaurantId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Burgers', null, {}),
};
