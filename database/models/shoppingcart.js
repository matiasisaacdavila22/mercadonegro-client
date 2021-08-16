'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingCart.belongsTo(models.User, {
        as:'user',
        foreignKey:'userId'
      });
      ShoppingCart.hasMany(models.DetailBuy, {
        as:"details",
        foreignKey:'buyId'
      });
      ShoppingCart.hasMany(models.Buy, {
        as:"buys",
        foreignKey:'userId'
      })
    }
  };
  ShoppingCart.init({
    userId: DataTypes.INTEGER,
    code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};