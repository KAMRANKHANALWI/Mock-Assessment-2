let { DataTypes, sequelize } = require("../lib/");

let dish = sequelize.define("dish", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  price: DataTypes.FLOAT,
});

module.exports = {
  dish,
};
