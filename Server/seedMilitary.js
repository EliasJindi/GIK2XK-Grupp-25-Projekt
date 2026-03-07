const Product = require('./Models/product');
const sequelize = require('./config/db');

const militaryProducts = [
  {
    title: "M4A1 Carbine",
    description: "Standardutrustning för infanteri. Levereras med sikte och ljuddämpare.",
    price: 25000,
    imageUrl: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=400",
    averageRating: 4.8
  },
  {
    title: "F-35 Lightning II",
    description: "Multifunktionellt stealth-stridsflygplan med avancerad radarstörning.",
    price: 850000000,
    imageUrl: "https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=400",
    averageRating: 5.0
  },
  {
    title: "Leopard 2A7",
    description: "Tungt bepansrad stridsvagn med 120mm slätborrad kanon.",
    price: 150000000,
    imageUrl: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=400",
    averageRating: 4.9
  },
  {
    title: "Taktisk Hjälm",
    description: "Ballistiskt skydd nivå III med fästen för mörkerkikare.",
    price: 8500,
    imageUrl: "https://images.unsplash.com/photo-1590502160462-0994f107f910?q=80&w=400",
    averageRating: 4.3
  }
];

const seed = async () => {
  try {
    await sequelize.sync({ alter: true }); // Uppdaterar tabellen ifall fält saknas
    await Product.destroy({ where: {} }); // Rensa gamla "gaming-prylar"
    await Product.bulkCreate(militaryProducts);
    console.log("MILITÄRT LAGER PÅFYLLT: 100% REDO.");
    process.exit();
  } catch (err) {
    console.error("Fel vid påfyllning av lager:", err);
    process.exit(1);
  }
};

seed();