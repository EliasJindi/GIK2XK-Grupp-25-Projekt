const Rating = require('../Models/rating');

/**
 * Sparar en komplett fältrapport (betyg, kommentar och användare).
 */
async function addRating(data) {
  try {
    return await Rating.create({
      product_id: data.productId,
      score: data.rating,     // Vi mappar 'rating' från frontenden till 'score' i DB
      comment: data.comment,  // Här sparar vi själva texten!
      user_id: data.userId    // Här kopplar vi det till Generalen (id: 1)
    });
  } catch (error) {
    throw new Error('Kunde inte spara fältrapport: ' + error.message);
  }
}

// getByProduct kan vara som den är
async function getByProduct(productId) {
  try {
    return await Rating.findAll({
      where: { product_id: productId },
      include: ['User'] // Lägg till detta för att få med namnet på den som skrivit!
    });
  } catch (error) {
    throw new Error('Kunde inte hämta betyg: ' + error.message);
  }
}

module.exports = { addRating, getByProduct };