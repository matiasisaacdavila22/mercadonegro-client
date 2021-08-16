'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buy.belongsTo(models.Store, {
        as:'store',
        foreignKey:'storeId'
      });
      Buy.belongsTo(models.User, {
        as:'user',
        foreignKey:'userId'
      });
      Buy.hasMany(models.DetailBuy, {
        as:"detailBuys",
        foreignKey:'buyId'
      })
    }
  };
  Buy.init({
    storeId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    wayToPay: DataTypes.STRING,
    transaction: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    condition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Buy',
  });
  return Buy;
};