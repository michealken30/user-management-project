const User = require("./User");
const Profile = require("./Profile");
const Role = require("./Role");
const Permission = require("../models/Permission");
const Group = require("./Group");

// User associations
User.hasOne(Profile);
Profile.belongsTo(User);

User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });

User.belongsToMany(Group, { through: "UserGroups" });
Group.belongsToMany(User, { through: "UserGroups" });

// Role and Permission associations
Role.belongsToMany(Permission, { through: "RolePermissions" });
Permission.belongsToMany(Role, { through: "RolePermissions" });

// Group and Permission associations
Group.belongsToMany(Permission, { through: "GroupPermissions" });
Permission.belongsToMany(Group, { through: "GroupPermissions" });

module.exports = {
  User,
  Profile,
  Role,
  Permission,
  Group,
};
