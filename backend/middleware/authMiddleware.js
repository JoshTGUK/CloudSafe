const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: "No user found in request" });
        }

        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: "Access denied: insufficient permissions" });
        }
    };
};

module.exports = {
    authorizeRole
}; 