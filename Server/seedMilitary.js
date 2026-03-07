const Product = require('./Models/product');
const sequelize = require('./config/db');

const militaryProducts = [
  {
    title: "F-35 Lightning II",
    description: "Multifunktionellt stealth-stridsflygplan med avancerad radarstörning.",
    price: 850000000,
    image_url: "/images/f35.jpg" // Din lokala bild
  },
  {
    title: "Leopard 2A7",
    description: "Tungt bepansrad stridsvagn med 120mm slätborrad kanon.",
    price: 150000000,
    image_url: "/images/tank.jpg" // Din lokala bild
  },
  {
    title: "B2 Bomber",
    description: "Stealth bomber",
    price: 8500,
    image_url: "/images/B2.jpg" // Din lokala bild
  }
];

const seed = async () => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Product.destroy({ where: {}, truncate: true }); 
    await Product.bulkCreate(militaryProducts);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log("MILITÄRT LAGER PÅFYLLT: 3 säkra produkter med lokala bilder!");
    process.exit();
  } catch (err) {
    console.error("Fel:", err);
    process.exit(1);
  }
};

seed();