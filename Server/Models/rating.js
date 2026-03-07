const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rating = sequelize.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: { // VIKTIGT: Lägg till denna för att koppla till Generalen
    type: DataTypes.INTEGER,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  comment: { // VIKTIGT: Lägg till denna för att spara din text "Riktigt stark"
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  underscored: true // Vi behåller denna så det matchar din övriga databas
});

module.exports = Rating;