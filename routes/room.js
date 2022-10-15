// Requirements
const router = require("express").Router();

// Controllers
const { roomCreateController, getRoomDataController } = require("../controllers/room");

// [POST]
router.post("/create", roomCreateController);
router.get("/info/:roomId", getRoomDataController);

module.exports = router;