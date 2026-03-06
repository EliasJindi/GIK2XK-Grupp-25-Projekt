const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  payed: {
    type: DataTypes.BOOLEAN, // Motsvarar bool i UML [cite: 169]
    defaultValue: false
  }
}, {
  underscored: true // Skapar user_id istället för userId [cite: 173]
});

module.exports = Cart;