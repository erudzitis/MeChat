// Requirements
const router = require("express").Router();

// Controllers
const { registerController, loginController } = require("../controllers/authentication");

// [POST]
router.post("/register", registerController);
router.post("/login", loginController);