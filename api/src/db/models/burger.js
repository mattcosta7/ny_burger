module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define(
    'Burger',
    {
      name: {
        type: DataTypes.STRING,
      },
      meatType: {
        type: DataTypes.STRING,
      },
      bunType: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id',
        },
      },
    },
    {}
  );
  Burger.associate = function associate(models) {
    // associations can be defined here
  };
  return Burger;
};
