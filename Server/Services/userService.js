const User = require('../Models/user');

async function getAll() {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error('Kunde inte hämta användare: ' + error.message);
  }
}

async function create(userData) {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error('Kunde inte skapa användare: ' + error.message);
  }
}

module.exports = {
  getAll,
  create
};