const { IMAGES_SIZES } = require('../../config');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Images', [
      {
        modelImagesId: 1,
        url: 'https://placehold.it/350x305',
        size: IMAGES_SIZES.MEDIUM,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Images', null, {}),
};
