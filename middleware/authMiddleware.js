const jwt = require('jsonwebtoken');
const jwtSecret = 'dfgxndhfjvznbcvzddmnbfcnvbxcmgvbzmfcbgvfnvmzfbvldnfv';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;