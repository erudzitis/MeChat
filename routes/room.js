// Requirements
const router = require("express").Router();

// Controllers
const { roomCreateController, roomAddUserController, getRoomDataController, roomLeaveController, readRoomController } = require("../controllers/room");

// [POST]
router.post("/create", roomCreateController);
router.post("/leave", roomLeaveController);
router.post("/add_user", roomAddUserController);
router.post("/read/:roomId", readRoomController);

// [GET]
router.get("/info/:roomId", getRoomDataController);

module.exports = router;