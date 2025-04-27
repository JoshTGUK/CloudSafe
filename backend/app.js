const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Main Express setup with middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create public/uploads directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
const uploadsDir = path.join(publicDir, 'uploads');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files with proper headers
app.use('/uploads', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cross-Origin-Opener-Policy': 'same-origin',
    });
    next();
}, express.static(path.join(__dirname, 'public', 'uploads')));

// Log all requests for debugging
app.use((req, res, next) => {
    console.log('\n=== Incoming Request ===');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Original URL: ${req.originalUrl}`);
    console.log(`Base URL: ${req.baseUrl}`);
    console.log(`Path: ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('======================\n');
    next();
});

// Routes
const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');

// Mount routes
app.use('/api/properties', propertiesRouter);
app.use('/api/users', usersRouter);

// Add OPTIONS handler for preflight requests
app.options('*', cors());

// Add 404 handler
app.use((req, res, next) => {
    console.log('404 Not Found:', req.method, req.url);
    res.status(404).json({ 
        error: 'Route not found',
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        baseUrl: req.baseUrl,
        path: req.path
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

module.exports = app;