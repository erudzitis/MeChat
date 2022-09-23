// Requirements
const router = require("express").Router();

// Controllers
const { roomCreateController } = require("../controllers/room");

// [POST]
router.post("/create", roomCreateController);

module.exports = router;