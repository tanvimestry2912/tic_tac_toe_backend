const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
