// Requirements
const router = require("express").Router();

// Controllers
const { roomCreateController, getRoomDataController } = require("../controllers/room");

// [POST]
router.post("/create", roomCreateController);
router.post("/info", getRoomDataController);

module.exports = router;