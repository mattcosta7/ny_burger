module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      name: DataTypes.STRING,
      description: {
        type: DataTypes.TEXT,
      },
      address1: {
        type: DataTypes.STRING,
      },
      address2: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      postalCode: {
        type: DataTypes.STRING,
      },
      geography: {
        type: DataTypes.GEOGRAPHY,
      },
    },
    {}
  );
  Restaurant.associate = function associate(models) {
    // associations can be defined here
  };
  return Restaurant;
};
