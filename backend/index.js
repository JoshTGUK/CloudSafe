require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const propertiesRouter = require('./routes/properties');

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Mount routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/properties', propertiesRouter);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
