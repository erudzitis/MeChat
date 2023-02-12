// Requirements
const router = require("express").Router();

// Controllers
const { registerController, loginController, logoutController, tokenController } = require("../controllers/authentication");

// [POST]
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/token", tokenController);

module.exports = router;