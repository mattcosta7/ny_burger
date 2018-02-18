const { IMAGES_SIZES } = require('../../config');

module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    'Images',
    {
      url: DataTypes.STRING,
      size: DataTypes.ENUM(Object.keys(IMAGES_SIZES)),
      modelImagesId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ModelImages',
          key: 'id',
          foreignKey: 'modelImagesId',
        },
      },
    },
    {}
  );
  Images.associate = function associate(models) {
    Images.belongsTo(models.ModelImages);
  };
  return Images;
};
