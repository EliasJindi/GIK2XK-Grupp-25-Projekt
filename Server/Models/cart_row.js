const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CartRow = sequelize.define('cart_row', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DOUBLE, // Double enligt UML [cite: 167]
    allowNull: false
  }
}, {
  underscored: true
});

module.exports = CartRow;