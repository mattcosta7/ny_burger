module.exports = (sequelize, DataTypes) => {
  const TeamMembers = sequelize.define(
    'TeamMembers',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      homeland: DataTypes.STRING,
      nickname: DataTypes.STRING,
      biography: DataTypes.TEXT,
      paramName: DataTypes.STRING,
    },
    {}
  );
  TeamMembers.associate = function associate(models) {
    // TeamMembers.belongsToMany(models.Images, {
    //   through: {
    //     model: models.ModelImages,
    //     unique: false,
    //     scope: {
    //       modelName: 'TeamMembers',
    //     },
    //   },
    //   foreignKey: 'modelId',
    //   constraints: false,
    // });
  };
  return TeamMembers;
};
