const Rating = require('../Models/rating');

// Lägg till ett betyg på en produkt
async function addRating(productId, ratingValue) {
  try {
    return await Rating.create({
      product_id: productId,
      rating: ratingValue
    });
  } catch (error) {
    throw new Error('Kunde inte lägga till betyg: ' + error.message);
  }
}

// Hämta alla betyg för en viss produkt
async function getByProduct(productId) {
  try {
    return await Rating.findAll({
      where: { product_id: productId }
    });
  } catch (error) {
    throw new Error('Kunde inte hämta betyg: ' + error.message);
  }
}

module.exports = {
  addRating,
  getByProduct
};