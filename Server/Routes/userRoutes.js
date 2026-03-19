/* 
API-ROUTES FÖR ANVÄNDARE 
Den här filen bestämmer hur hemsidan får prata med backend 
när det gäller användare. Den sköter både inloggning och 
att skapa nya konton
*/
const express = require('express');
const router = express.Router();
const userService = require('../Services/userService');

//Hämta alla användare
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrera ny användar
router.post('/', async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; // Denna rad exporterar  så att huvudservern (app.js) kan använda den.