const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // E-post bör vara unik
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true // Använder snake_case (t.ex. created_at) som i diagrammet [cite: 132]
});

module.exports = User;