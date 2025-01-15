const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Group, Permission } = require("../../models");

// Get all groups
router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [{ model: Permission }],
    });
    console.log(groups);
    res.json(groups);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Create group (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, permissionIds } = req.body;

    const group = await Group.create({
      name,
      description,
    });

    if (permissionIds) {
      await group.setPermissions(permissionIds);
    }

    res.json(group);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
