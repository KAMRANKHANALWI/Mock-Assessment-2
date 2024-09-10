let { DataTypes, sequelize } = require("../lib/");

let restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  location: DataTypes.TEXT,
  cuisine: DataTypes.TEXT,
});

module.exports = {
  restaurant,
};
