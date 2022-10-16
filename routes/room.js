// Requirements
const router = require("express").Router();

// Controllers
const { roomCreateController, getRoomDataController, roomLeaveController } = require("../controllers/room");

// [POST]
router.post("/create", roomCreateController);
router.post("/leave", roomLeaveController)

// [GET]
router.get("/info/:roomId", getRoomDataController);

module.exports = router;