const sequelize = require('./config/db');

async function runFix() {
    try {
        console.log("--- PÅBÖRJAR REPARATION ---");
        
        // 1. Stäng av säkerhetskollen tillfälligt
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        
        console.log("Rensar bort trasiga kopplingar...");

        // 2. Ta bort recensioner som pekar på produkter som inte finns
        await sequelize.query('DELETE FROM ratings WHERE product_id NOT IN (SELECT id FROM products)');
        
        // 3. Ta bort rader i kundvagnen som pekar på produkter som inte finns
        await sequelize.query('DELETE FROM cart_rows WHERE product_id NOT IN (SELECT id FROM products)');

        // 4. Slå på säkerhetskollen igen
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log("✔ REPARATION KLAR! Inga 'lösa' rader kvar.");
        console.log("Nu kan du köra 'node app.js' igen.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Fel vid lagning:", err);
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        process.exit(1);
    }
}

runFix();