const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (request, response, next) => {
    // Get token from headers
    const bearerToken = request.headers.authorization;
    
    // If token not existed
    if (!bearerToken) {
        return response.status(401).send({ message: "No token provided. Please login to continue." });
    }
    
    // Extract token
    const token = bearerToken.split(" ")[1];
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // Add decoded details to request for downstream use (optional)
        request.user = decoded;
        next();
    } catch (err) {
        return response.status(401).send({ message: "Invalid or expired token. Please login again." });
    }
};

module.exports = verifyToken;
