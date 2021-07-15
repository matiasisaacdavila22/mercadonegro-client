'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        as:"products",
        foreignKey:'categoryId',
       // foreignKey:'categoryId',
       // otherKey:'productId',
       // timestamps:false
      })
    }
  };
  Category.init({
    name: DataTypes.STRING,
    fatherId: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    condition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};