'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Color, {
        as:'colors',
        through: 'colorproducts',
        foreignKey: 'productId',
        otherKey:'colorId',
        timestamps: false
      });
      Product.belongsTo(models.Brand, {
        as:'brand',
        foreignKey: 'brandId'
      });
      Product.belongsTo(models.Category, {
        as:'category',
        foreignKey:'categoryId',
       // foreignKey: 'productId',
       // otherKey:'categoryId',
       // timestamps:false
      });
      Product.belongsTo(models.Store, {
        as:'store',
        foreignKey:'storeId'
      });
      Product.hasMany(models.Image, {
        as:"images",
        foreignKey:'productId'
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    model: DataTypes.STRING,
    price: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    keywords: DataTypes.TEXT,
    condition: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};