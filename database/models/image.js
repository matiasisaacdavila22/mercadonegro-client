'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Image.belongsTo(models.Product, {
       as:'product',
       foreignKey:'productId'
     })
    }
  };
  Image.init({
    name: DataTypes.STRING,
    orden: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    condition: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};