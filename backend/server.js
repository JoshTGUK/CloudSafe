require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initializeDatabase } = require('./models/schema');
const path = require('path');
const fs = require('fs');
const db = require('./config/db');
const initDb = require('./config/initDb');

const app = express();

// Initialize database
async function initServer() {
    try {
        // First check database connection
        await db.query('SELECT 1');
        console.log('Database connection established successfully');

        // Then initialize schema
        await initializeDatabase();
        console.log('Database schema initialized successfully');

        // Configure Helmet with adjusted CSP
        app.use(helmet({
            crossOriginResourcePolicy: { policy: "cross-origin" },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "blob:", "*"],
                    connectSrc: ["'self'", process.env.CORS_ORIGIN]
                }
            }
        }));

        // CORS configuration
        app.use(cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: ['Authorization']
        }));

        // Middleware for parsing JSON bodies
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Configure static file serving with proper headers
        app.use('/api/uploads', (req, res, next) => {
            res.set({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Cross-Origin-Resource-Policy': 'cross-origin'
            });
            next();
        }, express.static(uploadsDir));

        // Global error handler
        app.use((err, req, res, next) => {
            console.error('Global error:', err);
            res.status(500).json({
                message: 'Internal server error',
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        });

        // Routes
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/properties', require('./routes/properties'));
        app.use('/api/users', require('./routes/users'));

        await initDb(); // Initialize database tables
        
        const PORT = process.env.PORT || 3006;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log('Environment:', {
                NODE_ENV: process.env.NODE_ENV,
                PORT: PORT,
                DB_HOST: process.env.DB_HOST
            });
        });
    } catch (error) {
        console.error('Server initialization failed:', error);
        process.exit(1);
    }
}

initServer();

module.exports = app;
