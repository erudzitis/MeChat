// Requirements
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const userModel = require("../database/models/user");
const customError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

// [POST] Registration controller for users
const registerController = async (req, res) => {
    const { username, password, email, description = "Hey there, I am using Chat Application!" } = req.body;

    // Missing parameters
    if (!username | !password | !email) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Checking whether such user already exists
    const existingUser = await userModel.query().findOne({
        email: email
    });

    // User with provided email already exists
    if (existingUser) {
        throw new customError("User with provided email already exists!", StatusCodes.CONFLICT);
    }

    // Hashing user provided password
    const passwordHash = await argon2.hash(password);

    // Proceed with user creation
    const newUser = await userModel.query().insert({
        username: username,
        password: passwordHash,
        email: email,
        description,
    });

    // Generate access and refresh tokens
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    res.status(StatusCodes.OK)
        .cookie("refreshToken", refreshToken, {
            httpOnly: true, // Limiting javascript access to the cookie on front-end
            secure: process.env.NODE_ENV === "production" // Enforcing the cookie to be sent over only secure channel in production
        })
        .json({ accessToken });
};

// [POST] Login controller for users
const loginController = async (req, res) => {
    const { username, password } = req.body;

    // Missing parameters
    if (!username | !password) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Checking whether requested user even exists
    const requestUser = await userModel.query().findOne({
        username: username
    });

    // User with provided email already exists
    if (!requestUser) {
        throw new customError("User not found!", StatusCodes.NOT_FOUND);
    }

    // Proceed with password validation
    const validateHash = await argon2.verify(requestUser.password, password);

    // Passwords do not match
    if (!validateHash) {
        throw new customError("Passwords do not match!", StatusCodes.UNAUTHORIZED);
    }

    // Generate access and refresh tokens
    const accessToken = requestUser.generateAccessToken();
    const refreshToken = requestUser.generateRefreshToken();

    res.status(StatusCodes.OK)
        .cookie("refreshToken", refreshToken, {
            httpOnly: true, // Limiting javascript access to the cookie on front-end
            secure: process.env.NODE_ENV === "production" // Enforcing the cookie to be sent over only secure channel in production
        })
        .json({ accessToken });
};

// [POST] Logout controller for users
// TODO: Users should typically should be limited to have access to such a route if they are not logged in,
// maybe reformat the auth middleware for this route
const logoutController = async (req, res) => {
    res.status(StatusCodes.OK)
        .clearCookie("refreshToken")
        .json({ success: true });
}

// [POST] Access token generator for authenticated users
const tokenController = async (req, res) => {
    // Retrieving refresh token from cookies
    const refreshToken = req.cookies?.refreshToken;

    // Refresh token not found
    if (!refreshToken) {
        throw new customError("Forbidden, invalid refresh token!", StatusCodes.FORBIDDEN);
    }

    // Refresh token was found, proceed with token validation
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, decoded) => {
        // Error occured
        if (error) {
            throw new customError("Forbidden, invalid refresh token!", StatusCodes.FORBIDDEN);
        }

        // Refresh token was successfully decoded, attempt to generate new access token for user
        (async () => {
            // Getting the appropriate user instance
            const user = await userModel.query().findOne({
                id: decoded.id
            });

            // Generating new access token
            const accessToken = user.generateAccessToken();

            res.status(StatusCodes.OK)
                .json({ accessToken });
        })();
    });
}

// Exports
module.exports = {
    registerController,
    loginController,
    logoutController,
    tokenController
};