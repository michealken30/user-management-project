const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Role, Permission } = require("../../models");

// Get all roles
router.get("/", auth, async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ model: Permission }],
    });

    res.json(roles);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Create role (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, permissionIds } = req.body;

    const role = await Role.create({
      name,
      description,
    });

    if (permissionIds) {
      await role.setPermissions(permissionIds);
    }

    res.json(role);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
