module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Burgers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      meatType: {
        type: Sequelize.STRING,
      },
      bunType: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Burgers'),
};
