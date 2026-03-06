const express = require('express');
const router = express.Router();
const ratingService = require('../Services/ratingService');

// POST: http://localhost:5000/ratings (Lämna ett betyg)
router.post('/', async (req, res) => {
  try {
    const { product_id, rating } = req.body;
    const result = await ratingService.addRating(product_id, rating);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: http://localhost:5000/ratings/product/1 (Se alla betyg för en produkt)
router.get('/product/:id', async (req, res) => {
  try {
    const ratings = await ratingService.getByProduct(req.params.id);
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;