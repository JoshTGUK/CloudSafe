const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const axios = require('axios');
const db = require('../config/db');

// Debug middleware for this route
router.use((req, res, next) => {
    console.log('Auth Route:', {
        method: req.method,
        path: req.path,
        body: req.body,
        headers: req.headers
    });
    next();
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt for email:', email);

        // Find user
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const user = users[0];
        console.log('User found:', user ? 'Yes' : 'No');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isValid ? 'Yes' : 'No');

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token with the correct user ID
        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                role: user.role
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Generated token for user:', {
            userId: user.id,
            email: user.email,
            role: user.role
        });

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role
            } 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// reCAPTCHA verification function
async function verifyRecaptcha(token) {
    if (!token) {
        console.log('No reCAPTCHA token provided');
        return false;
    }

    try {
        console.log('Verifying reCAPTCHA token...');
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token
                }
            }
        );
        
        console.log('reCAPTCHA verification response:', response.data);
        return response.data.success;
    } catch (error) {
        console.error('reCAPTCHA verification error:', {
            message: error.message,
            response: error.response?.data
        });
        return false;
    }
}

// Registration route with better error handling
router.post('/register', async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            password, 
            phoneNumber, 
            role,
            captchaToken 
        } = req.body;

        // Detailed request logging
        console.log('Registration request received:', {
            firstName: !!firstName,
            lastName: !!lastName,
            email: !!email,
            hasPassword: !!password,
            phoneNumber: !!phoneNumber,
            role,
            hasCaptcha: !!captchaToken
        });

        // Check database connection first
        try {
            await db.query('SELECT 1');
            console.log('Database connection verified');
        } catch (dbError) {
            console.error('Database connection failed:', dbError);
            throw new Error('Database connection failed');
        }

        // Insert user with error handling for each step
        try {
            // First check if user exists
            const [existingUsers] = await db.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (existingUsers.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            const username = email.split('@')[0];

            // Log the exact SQL query we're about to execute
            const insertQuery = `
                INSERT INTO users (
                    username,
                    email,
                    password,
                    first_name,
                    last_name,
                    phone_number,
                    role,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;

            console.log('Executing query with values:', {
                username,
                email,
                passwordLength: hashedPassword.length,
                firstName,
                lastName,
                phoneNumber: phoneNumber || null,
                role: role || 'viewer'
            });

            const [result] = await db.query(
                insertQuery,
                [
                    username,
                    email,
                    hashedPassword,
                    firstName,
                    lastName,
                    phoneNumber || null,
                    role || 'viewer'
                ]
            );

            console.log('Insert result:', result);

            // Generate token
            const token = jwt.sign(
                { userId: result.insertId },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: result.insertId,
                    email,
                    username,
                    firstName,
                    lastName,
                    role
                }
            });

        } catch (dbError) {
            console.error('Database operation failed:', {
                error: dbError,
                code: dbError.code,
                sqlMessage: dbError.sqlMessage,
                sql: dbError.sql
            });
            throw new Error(`Database operation failed: ${dbError.sqlMessage || dbError.message}`);
        }

    } catch (error) {
        console.error('Registration failed:', {
            error: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: 'Registration failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Add this test endpoint at the top of your routes
router.get('/test-db', async (req, res) => {
    try {
        const [result] = await db.query('SELECT 1 as test');
        res.json({ 
            success: true, 
            result,
            dbName: process.env.DB_NAME
        });
    } catch (error) {
        console.error('Database test failed:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

module.exports = router;
