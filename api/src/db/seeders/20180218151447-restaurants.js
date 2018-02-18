module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Restaurants', [
      {
        name: 'Restaurant1',
        description: 'the almighty first restaurant',
        address1: 'address 1',
        address2: 'address 2',
        city: "the city it's in",
        country: 'usa',
        postalCode: '11103',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Restaurants', null, {}),
};
