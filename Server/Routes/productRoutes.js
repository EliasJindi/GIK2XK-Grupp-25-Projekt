const express = require('express');
const router = express.Router();
const productService = require('../Services/productService');

// GET: http://localhost:5000/products (Hämta alla)
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: http://localhost:5000/products/:id (Hämta en specifik)
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produkten hittades inte' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: http://localhost:5000/products (Skapa en ny produkt)
router.post('/', async (req, res) => {
  try {
    const newProduct = await productService.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;