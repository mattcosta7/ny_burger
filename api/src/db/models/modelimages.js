module.exports = (sequelize, DataTypes) => {
  const ModelImages = sequelize.define(
    'ModelImages',
    {
      modelName: DataTypes.STRING,
      modelId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  ModelImages.associate = function associate(models) {
    // ModelImages.hasMany(models.Images);
    // ModelImages.belongsTo(models.TeamMembers, {});
  };
  return ModelImages;
};
