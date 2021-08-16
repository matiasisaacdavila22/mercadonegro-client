'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.ShoppingCart, {
        as:'shoppingCart',
        foreignKey:'userId'
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    photo: DataTypes.STRING,
    condition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};