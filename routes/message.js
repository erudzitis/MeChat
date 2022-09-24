// Requirements
const router = require("express").Router();

// Controllers
const { messageCreateController } = require("../controllers/message");

// [POST]
router.post("/create", messageCreateController);

module.exports = router;