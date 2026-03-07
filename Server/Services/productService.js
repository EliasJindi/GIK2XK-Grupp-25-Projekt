const Product = require('../Models/product');
const Rating = require('../Models/rating');
const User = require('../Models/user'); // VIKTIGT: Denna saknades!

async function getAllProducts() {
  try {
    // Vi hämtar produkterna och inkluderar alla recensioner och användarnamn
    const products = await Product.findAll({
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ['username'] }]
        }
      ]
    });

    // Formatera datan så att React förstår den
    return products.map(product => {
      const plain = product.get({ plain: true });
      const ratings = plain.ratings || [];
      
      const total = ratings.reduce((sum, r) => sum + r.score, 0);
      const avg = ratings.length > 0 ? total / ratings.length : 0;

      return {
        ...plain,
        averageRating: avg,
        Ratings: ratings // React-koden letar efter 'Ratings' med stort R
      };
    });
  } catch (error) {
    console.error("Fel i productService:", error);
    throw error;
  }
}

async function getById(id) {
  return await Product.findByPk(id, { include: [{ model: Rating, include: [User] }] });
}

async function createProduct(data) {
  return await Product.create(data);
}

module.exports = { getAllProducts, getById, createProduct };