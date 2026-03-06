const Product = require('../Models/product');

// Hämtar alla produkter från databasen
async function getAll() {
  try {
    return await Product.findAll();
  } catch (error) {
    throw new Error('Kunde inte hämta produkter: ' + error.message);
  }
}

// Hämtar en specifik produkt baserat på ID
async function getById(id) {
  try {
    return await Product.findByPk(id);
  } catch (error) {
    throw new Error('Kunde inte hämta produkten: ' + error.message);
  }
}

// Skapar en ny produkt (används av administratörer)
async function create(productData) {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw new Error('Kunde inte skapa produkten: ' + error.message);
  }
}

module.exports = {
  getAll,
  getById,
  create
};