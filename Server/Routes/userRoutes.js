const express = require('express');
const router = express.Router();
const userService = require('../Services/userService');

// GET: http://localhost:5000/users (Hämta alla användare)
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: http://localhost:5000/users (Registrera ny användare)
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; // Denna rad är livsviktig!