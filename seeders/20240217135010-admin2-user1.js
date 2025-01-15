const { User, Role, Permission, Group } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Clear existing roles, permissions, and groups before seeding new ones
      await Role.destroy({ where: {} });
      await Permission.destroy({ where: {} });
      await Group.destroy({ where: {} });

      // Create default roles
      const roles = await Role.bulkCreate([
        { name: "admin", description: "Full access to all features" },
        { name: "manager", description: "Can manage users and content" },
        { name: "user", description: "Basic access" },
      ]);

      // Create default permissions
      const permissions = await Permission.bulkCreate([
        { name: "create_user", description: "Can create users" },
        { name: "edit_user", description: "Can edit users" },
        { name: "delete_user", description: "Can delete users" },
        { name: "view_user", description: "Can view users" },
      ]);

      // Create default groups
      const groups = await Group.bulkCreate([
        { name: "IT", description: "IT Department" },
        { name: "HR", description: "Human Resources" },
        { name: "Finance", description: "Finance Department" },
      ]);

      // Delete existing admin user
      const existingAdminUser = await User.findOne({
        where: { email: "admin@example.com" },
      });
      if (existingAdminUser) {
        await existingAdminUser.destroy();
        console.log("Existing admin user deleted");
      }

      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash("1234567", salt);

      const adminUser = await User.create({
        username: "admin",
        email: "admin1@gmail.com",
        password: newHashedPassword,
      });
      console.log("New Admin User Created:", adminUser);

      // Assign admin role to the new admin user
      const adminRole = await Role.findOne({ where: { name: "admin" } });
      await adminUser.addRole(adminRole);
      console.log("New admin role assigned to admin user");

      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Define how to revert the seed operations
    await User.destroy({ where: {} });
    await Role.destroy({ where: {} });
    await Permission.destroy({ where: {} });
    await Group.destroy({ where: {} });
  },
};
