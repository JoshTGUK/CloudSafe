const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        // Get the authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');

        if (!token) {
            console.log('Auth middleware - No token provided');
            return res.status(401).json({ message: 'No authentication token provided' });
        }

        // Verify and decode the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Auth middleware - Token verification failed:', err);
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            // Log the decoded token contents
            console.log('Auth middleware - Decoded token:', decoded);

            if (!decoded.userId) {
                console.error('Auth middleware - No userId in token:', decoded);
                return res.status(401).json({ message: 'Invalid token format' });
            }

            // Set user info in request
            req.user = {
                id: decoded.userId,
                email: decoded.email,
                role: decoded.role
            };

            console.log('Auth middleware - User set:', req.user);
            next();
        });
    } catch (error) {
        console.error('Auth middleware - Error:', error);
        res.status(500).json({ message: 'Authentication error' });
    }
};

module.exports = authenticateToken;
