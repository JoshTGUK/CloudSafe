const db = require('./db');

async function initDb() {
    try {
        // Verify connection to the database
        await db.query('SELECT 1');
        console.log('Connected to database:', process.env.DB_NAME);

        // Verify each table exists
        const tables = [
            'users',
            'properties',
            'anchor_points',
            'inspections',
            'tasks',
            'documents',
            'comments'
        ];

        for (const table of tables) {
            const [rows] = await db.query(`
                SELECT 1 FROM information_schema.tables 
                WHERE table_schema = ? AND table_name = ?
            `, [process.env.DB_NAME, table]);

            if (rows.length > 0) {
                console.log(`✓ Table '${table}' verified`);
            } else {
                console.error(`✗ Table '${table}' not found`);
            }
        }

    } catch (error) {
        console.error('Database verification failed:', error);
        throw error;
    }
}

module.exports = initDb; 