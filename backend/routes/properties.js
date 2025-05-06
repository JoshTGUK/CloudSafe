const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../models/Property');
const fs = require('fs');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');
const anchorPointsRouter = require('./anchorPoints');

// Before setting up routes
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize multer with the storage configuration
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Mount anchor points router for each property
router.use('/:propertyId/anchor-points', anchorPointsRouter);

// Routes
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        const userId = req.user.id;

        let imageUrl = null;
        if (req.file) {
            imageUrl = `uploads/${req.file.filename}`;
        }

        const [result] = await db.query(`
            INSERT INTO properties (
                name, address, image_url, latitude, longitude, user_id, 
                status, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())
        `, [name, address, imageUrl, latitude || null, longitude || null, userId]);

        const [newProperty] = await db.query(
            'SELECT * FROM properties WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            message: 'Property created successfully',
            property: {
                ...newProperty[0],
                image_url: imageUrl ? `uploads/${path.basename(imageUrl)}` : null
            }
        });
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ message: 'Failed to create property' });
    }
});

// GET route for fetching properties
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [properties] = await db.query(`
            SELECT 
                p.*,
                u.first_name as owner_first_name,
                u.last_name as owner_last_name
            FROM properties p 
            LEFT JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `);
        
        const propertiesWithFullUrls = properties.map(property => ({
            ...property,
            image_url: property.image_url ? `uploads/${path.basename(property.image_url)}` : null
        }));
        
        res.json(propertiesWithFullUrls);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET single property
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const [property] = await db.query(
            'SELECT * FROM properties WHERE id = ?',
            [req.params.id]
        );

        if (!property || property.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Format the image URL
        const propertyWithUrl = {
            ...property[0],
            image_url: property[0].image_url ? `uploads/${path.basename(property[0].image_url)}` : null
        };

        res.json(propertyWithUrl);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ error: 'Failed to fetch property' });
    }
});

// PUT update property
router.put('/:id', async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        await property.update(req.body);
        res.json(property);
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ error: 'Failed to update property' });
    }
});

// DELETE property
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        // First get the property to check if it exists and get image path
        const [property] = await db.query(
            'SELECT * FROM properties WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );

        if (!property || property.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Delete the property
        const [result] = await db.query(
            'DELETE FROM properties WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // If there was an image, delete it
        if (property[0].image_url) {
            const imagePath = path.join(__dirname, '..', property[0].image_url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ error: 'Failed to delete property' });
    }
});

module.exports = router;
