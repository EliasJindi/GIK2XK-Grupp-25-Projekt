const Cart = require('../Models/cart');
const CartRow = require('../Models/cart_row');
const Product = require('../Models/product');

// Lägg till en produkt i varukorgen
async function addProductToCart(userId, productId, amount) {
  try {
    // 1. Hitta en befintlig korg som inte är betald, eller skapa en ny
    let [cart] = await Cart.findOrCreate({
      where: { user_id: userId, payed: false }
    });

    // 2. Kolla om produkten redan finns i korgen
    let cartRow = await CartRow.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });

    if (cartRow) {
      // Om den finns: Öka antalet
      cartRow.amount += parseFloat(amount);
      await cartRow.save();
    } else {
      // Om den inte finns: Skapa en ny rad
      cartRow = await CartRow.create({
        cart_id: cart.id,
        product_id: productId,
        amount: amount
      });
    }

    return cartRow;
  } catch (error) {
    throw new Error('Kunde inte lägga till i varukorgen: ' + error.message);
  }
}

// Hämta hela innehållet i en användares aktiva varukorg
async function getCartByUser(userId) {
  try {
    return await Cart.findOne({
      where: { user_id: userId, payed: false },
      include: [
        {
          model: Product,
          through: { attributes: ['amount'] } // Hämtar antal från kopplingstabellen
        }
      ]
    });
  } catch (error) {
    throw new Error('Kunde inte hämta varukorgen: ' + error.message);
  }
}

// Markera varukorgen som betald (Checkout)
async function checkout(userId) {
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId, payed: false }
    });

    if (!cart) {
      throw new Error('Ingen aktiv varukorg hittades för denna användare.');
    }

    cart.payed = true; // Ändrar status till betald
    await cart.save();
    return { message: 'Betalning genomförd, varukorgen är nu stängd.' };
  } catch (error) {
    throw new Error('Kunde inte genomföra betalning: ' + error.message);
  }
}

module.exports = {
  addProductToCart,
  getCartByUser,
  checkout
};