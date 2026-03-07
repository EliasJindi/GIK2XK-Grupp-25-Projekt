const Product = require('./Models/product');
const sequelize = require('./config/db');

const militaryProducts = [
  {
    title: "M4A1 Carbine",
    description: "Standardutrustning för infanteri. Levereras med sikte och ljuddämpare.",
    price: 25000,
    image_url: "https://cdn.pixabay.com/photo/2016/01/19/16/46/rifle-1149516_1280.jpg"
  },
  {
    title: "F-35 Lightning II",
    description: "Multifunktionellt stealth-stridsflygplan med avancerad radarstörning.",
    price: 850000000,
    image_url: "https://cdn.pixabay.com/photo/2021/11/24/13/46/f-35-6821210_1280.jpg"
  },
  {
    title: "Leopard 2A7",
    description: "Tungt bepansrad stridsvagn med 120mm slätborrad kanon.",
    price: 150000000,
    image_url: "https://cdn.pixabay.com/photo/2017/08/30/11/45/tank-2696752_1280.jpg"
  },
  {
    title: "Taktisk Hjälm",
    description: "Ballistiskt skydd nivå III med fästen för mörkerkikare.",
    price: 8500,
    image_url: "https://cdn.pixabay.com/photo/2014/01/29/18/46/helmet-254477_1280.jpg"
  }
];

const seed = async () => {
  try {
    await sequelize.sync({ alter: true });
    await Product.destroy({ where: {} }); 
    await Product.bulkCreate(militaryProducts);
    console.log("MILITÄRT LAGER PÅFYLLT: 100% REDO.");
    process.exit();
  } catch (err) {
    console.error("Fel vid påfyllning av lager:", err);
    process.exit(1);
  }
};

seed();