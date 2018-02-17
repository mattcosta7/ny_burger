module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define(
    'Burger',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Burger.associate = function (models) {
    // associations can be defined here
  };
  return Burger;
};
