'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserStore.belongsTo(models.Store, {
        as:'store',
        foreignKey:'storeId'
      });
    }
  };
  UserStore.init({
    photo: DataTypes.TEXT,
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    condition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserStore',
  });
  return UserStore;
};