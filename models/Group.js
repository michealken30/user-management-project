const { DataTypes } = require("sequelize");
const sequelize = require("../server/config/database");

const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Group;
