'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.hasMany(models.Product, {
        as:'products',
        foreignKey:'storeId'
      })
    }
  };
  Store.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.INTEGER,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    condition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};