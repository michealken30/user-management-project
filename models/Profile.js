const { DataTypes } = require("sequelize");
const sequelize = require("../server/config/database");

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  avatarUrl: {
    type: DataTypes.STRING,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Profile;
