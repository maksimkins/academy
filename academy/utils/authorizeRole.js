const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ error: 'Access denied. User role information is missing.' });
        }

        // Check if the user's role matches the required role
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: `Access denied. Only ${requiredRole}s are allowed to access this route.` });
        }

        next();
    };
};

module.exports = authorizeRole;