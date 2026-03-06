const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');

// 1. IMPORTERA MODELLER
const User = require('./Models/user'); 
const Product = require('./Models/product');
const Rating = require('./Models/rating');
const Cart = require('./Models/cart');
const CartRow = require('./Models/cart_row');

// 2. RELATIONER (UML-standard)
User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Rating, { foreignKey: 'product_id' });
Rating.belongsTo(Product, { foreignKey: 'product_id' });

Cart.belongsToMany(Product, { through: CartRow, foreignKey: 'cart_id' });
Product.belongsToMany(Cart, { through: CartRow, foreignKey: 'product_id' });

// 3. EXPRESS SETUP
const app = express();
app.use(cors());
app.use(express.json());

// 4. ROUTES (Alla sektioner på plats!)
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const ratingRoutes = require('./Routes/ratingRoutes');

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/ratings', ratingRoutes);

app.get('/', (req, res) => res.send('Backend är 100% redo och synkad!'));

// 5. SYNKA OCH STARTA
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('MySQL-databasen är synkad!');
    app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
  })
  .catch(err => console.error('Synk-fel:', err));