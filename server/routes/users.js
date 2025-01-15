const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, Profile, Role, Group } = require("../../models");

// Get all users (admin only)
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role }],
    });

    const isAdmin = user.Roles.some((role) => role.name === "admin");
    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.findAll({
      include: [{ model: Profile }, { model: Role }, { model: Group }],
    });
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Create user (admin and manager only)
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role }],
    });

    const canCreate = user.Roles.some((role) =>
      ["admin", "manager"].includes(role.name)
    );

    if (!canCreate) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { username, email, password, roleIds, groupIds } = req.body;

    const newUser = await User.create({
      username,
      email,
      password,
    });

    if (roleIds) {
      await newUser.setRoles(roleIds);
    }

    if (groupIds) {
      await newUser.setGroups(groupIds);
    }

    res.json(newUser);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete user (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role }],
    });

    const isAdmin = user.Roles.some((role) => role.name === "admin");
    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    await User.destroy({
      where: { id: req.params.id },
    });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
