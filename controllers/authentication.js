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

};

// Exports
module.exports = {
    registerController,
    loginController
};