// Requirements
const jwt = require("jsonwebtoken");
const customError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

/**
 * Authorization function that will sit on top of 'protected' routes
 */
const authorizationMiddleware = async (req, res, next) => {
    // Attempting to fetch access token from header
    const token = req.headers?.authorization?.split(" ")[1];

    // No token found
    if (!token) {
        throw new customError("Unauthorized, invalid access token!", StatusCodes.UNAUTHORIZED);
    }

    // Token was found, proceed with token validation
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        // Error occured
        if (error) {
            throw new customError("Unauthorized, invalid access token!", StatusCodes.UNAUTHORIZED);
        }

        // Token was successfully verified, update request with necessary decoded data
        req.userId = decoded.id;
        req.userUsername = decoded.username;

        // Continue to the next middleware
        next();        
    });
};

module.exports = authorizationMiddleware;