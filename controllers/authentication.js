// Requirements
const argon2 = require("argon2");
const userModel = require("../database/models/user");
const customError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

// [POST] Registration controller for users
const registerController = async (req, res) => {
    const { username, password, email } = req.body;

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
        email: email
    });

    // Generate jwt token
    const token = newUser.generateJWT();

    res.status(StatusCodes.OK).json({
        success: true,
        token: token
    });
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

    // Otherwise login was successful, proceed with token generation
    const token = requestUser.generateJWT();

    res.status(StatusCodes.OK).json({
        success: true,
        token: token
    })
};

// Exports
module.exports = {
    registerController,
    loginController
};