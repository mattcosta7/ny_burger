const { IMAGES_SIZES } = require('../../config');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      modelImagesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ModelImages',
          key: 'id',
        },
      },
      url: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.ENUM(Object.keys(IMAGES_SIZES)),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Images'),
};
