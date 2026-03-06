const express = require('express');
const router = express.Router();
const cartService = require('../Services/cartService');

// POST: http://localhost:5000/cart/add (Lägg till vara)
router.post('/add', async (req, res) => {
  try {
    const { user_id, product_id, amount } = req.body;
    const result = await cartService.addProductToCart(user_id, product_id, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: http://localhost:5000/cart/:userId (Hämta användarens korg)
router.get('/:userId', async (req, res) => {
  try {
    const cart = await cartService.getCartByUser(req.params.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: http://localhost:5000/cart/checkout/:userId (Betala/stäng korg)
router.put('/checkout/:userId', async (req, res) => {
  try {
    const result = await cartService.checkout(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;