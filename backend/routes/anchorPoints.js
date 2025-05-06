const express = require('express');
const router = express.Router({ mergeParams: true }); // Important: mergeParams allows access to propertyId
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for test report uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'test-reports');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'test-report-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept PDFs and common document formats
        if (!file.originalname.match(/\.(pdf|doc|docx|xls|xlsx)$/)) {
            return cb(new Error('Only document files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Debug middleware for this router
router.use((req, res, next) => {
    console.log('\n=== Anchor Points Router ===');
    console.log('Base URL:', req.baseUrl);
    console.log('Original URL:', req.originalUrl);
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    console.log('Property ID:', req.params.propertyId);
    console.log('Auth Header:', req.headers.authorization);
    console.log('==========================\n');
    next();
});

// Get anchor points for a property
router.get('/', authenticateToken, async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        console.log('Authenticated user:', req.user);
        console.log('Fetching anchor points for property:', propertyId);

        const [anchorPoints] = await db.query(
            'SELECT * FROM anchor_points WHERE property_id = ?',
            [propertyId]
        );
        
        console.log('Database query results:', anchorPoints);
        return res.json(anchorPoints || []);
    } catch (error) {
        console.error('Error in GET anchor points:', error);
        res.status(500).json({ error: 'Failed to fetch anchor points', details: error.message });
    }
});

// Create anchor point
router.post('/', authenticateToken, async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const { location, type, lastTestDate } = req.body;

        console.log('Create anchor point request:', {
            propertyId,
            body: req.body,
            user: req.user
        });

        const [result] = await db.query(
            `INSERT INTO anchor_points 
            (property_id, name, location_description, status, 
             last_inspection_date, next_inspection_date, 
             latitude, longitude, installation_date,
             test_report_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                propertyId,
                location,
                location,
                'Pending',
                lastTestDate || new Date(),
                new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                0,
                0,
                new Date(),
                null // Initial test_report_url is null
            ]
        );

        const [newAnchorPoint] = await db.query(
            'SELECT * FROM anchor_points WHERE id = ?',
            [result.insertId]
        );

        console.log('Created new anchor point:', newAnchorPoint[0]);
        res.status(201).json(newAnchorPoint[0]);
    } catch (error) {
        console.error('Error in POST anchor point:', error);
        res.status(500).json({ error: 'Failed to create anchor point', details: error.message });
    }
});

// Upload test report
router.post('/:id/test-report', authenticateToken, upload.single('testReport'), async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = req.params.propertyId;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const testReportUrl = `uploads/test-reports/${req.file.filename}`;

        await db.query(
            'UPDATE anchor_points SET test_report_url = ? WHERE id = ? AND property_id = ?',
            [testReportUrl, id, propertyId]
        );

        const [updatedPoint] = await db.query(
            'SELECT * FROM anchor_points WHERE id = ? AND property_id = ?',
            [id, propertyId]
        );

        if (!updatedPoint[0]) {
            return res.status(404).json({ error: 'Anchor point not found' });
        }

        res.json(updatedPoint[0]);
    } catch (error) {
        console.error('Error uploading test report:', error);
        res.status(500).json({ error: 'Failed to upload test report' });
    }
});

// Get test report
router.get('/:id/test-report', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = req.params.propertyId;

        const [anchorPoint] = await db.query(
            'SELECT test_report_url FROM anchor_points WHERE id = ? AND property_id = ?',
            [id, propertyId]
        );

        if (!anchorPoint[0] || !anchorPoint[0].test_report_url) {
            return res.status(404).json({ error: 'Test report not found' });
        }

        res.json({ url: anchorPoint[0].test_report_url });
    } catch (error) {
        console.error('Error getting test report:', error);
        res.status(500).json({ error: 'Failed to get test report' });
    }
});

// Update anchor point
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = req.params.propertyId;
        const { location, type, lastTestDate, status } = req.body;

        const nextTestDate = new Date(lastTestDate);
        nextTestDate.setFullYear(nextTestDate.getFullYear() + 1);

        await db.query(
            `UPDATE anchor_points 
             SET name = ?,
                 location_description = ?,
                 status = ?,
                 last_inspection_date = ?,
                 next_inspection_date = ?,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = ? AND property_id = ?`,
            [location, location, status || 'Pending', lastTestDate, nextTestDate, id, propertyId]
        );

        const [updatedPoint] = await db.query(
            'SELECT * FROM anchor_points WHERE id = ? AND property_id = ?',
            [id, propertyId]
        );

        if (!updatedPoint[0]) {
            return res.status(404).json({ error: 'Anchor point not found' });
        }

        res.json(updatedPoint[0]);
    } catch (error) {
        console.error('Error updating anchor point:', error);
        res.status(500).json({ error: 'Failed to update anchor point', details: error.message });
    }
});

// Delete anchor point
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = req.params.propertyId;
        await db.query('DELETE FROM anchor_points WHERE id = ? AND property_id = ?', [id, propertyId]);
        res.json({ message: 'Anchor point deleted successfully' });
    } catch (error) {
        console.error('Error deleting anchor point:', error);
        res.status(500).json({ error: 'Failed to delete anchor point' });
    }
});

// Update anchor point status
router.patch('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const propertyId = req.params.propertyId;
        const { status } = req.body;

        if (!['Pass', 'Fail', 'Pending'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Must be Pass, Fail, or Pending' });
        }

        await db.query(
            'UPDATE anchor_points SET status = ? WHERE id = ? AND property_id = ?',
            [status, id, propertyId]
        );

        const [updatedPoint] = await db.query(
            'SELECT * FROM anchor_points WHERE id = ? AND property_id = ?',
            [id, propertyId]
        );

        if (!updatedPoint[0]) {
            return res.status(404).json({ error: 'Anchor point not found' });
        }

        res.json(updatedPoint[0]);
    } catch (error) {
        console.error('Error updating anchor point status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Get failed count
router.get('/failed-count', authenticateToken, async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const [result] = await db.query(
            'SELECT COUNT(*) as count FROM anchor_points WHERE property_id = ? AND status = ?',
            [propertyId, 'Fail']
        );
        res.json({ count: result[0].count });
    } catch (error) {
        console.error('Error counting failed anchor points:', error);
        res.status(500).json({ error: 'Failed to count failed items' });
    }
});

module.exports = router;

