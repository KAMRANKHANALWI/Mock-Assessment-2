let { DataTypes, sequelize } = require("../lib/");

let chef = sequelize.define("chef", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  specialty: DataTypes.TEXT,
});

module.exports = {
  chef,
};
