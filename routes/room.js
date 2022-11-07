// Requirements
const router = require("express").Router();

// Controllers
const { roomCreateController, roomAddUserController, getRoomDataController, roomLeaveController } = require("../controllers/room");

// [POST]
router.post("/create", roomCreateController);
router.post("/leave", roomLeaveController);
router.post("/add_user", roomAddUserController);

// [GET]
router.get("/info/:roomId", getRoomDataController);

module.exports = router;