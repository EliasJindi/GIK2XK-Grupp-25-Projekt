const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT // Vi använder TEXT för att rymma längre beskrivningar [cite: 171]
  },
  price: {
    type: DataTypes.DOUBLE, // Double enligt kravet i diagrammet [cite: 176]
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING // Sparar länken till produktbilden [cite: 179]
  }
}, {
  underscored: true // Ser till att databasen använder t.ex. created_at [cite: 157, 161]
});

module.exports = Product;