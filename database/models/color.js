'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Color.belongsToMany(models.Product, {
        as:'products',
        through: 'colorproducts',
        foreignKey: 'colorId',
        otherKey:'productId',
        timestamps: false
      });
    }
  };
  Color.init({
    name: DataTypes.STRING,
    condition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};