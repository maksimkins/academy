const jwt = require('jsonwebtoken');

const JWT_SECRET = 'HShah546!ldm++'; 

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token)
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const tokenValue = token.split(' ')[1]; 

    jwt.verify(tokenValue, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;