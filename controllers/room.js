// Requirements
const roomModel = require("../database/models/room");
const customError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

// [POST] Route for creating chat rooms
const roomCreateController = async (req, res) => {
    // TODO: append userId after successful authorization to the request
    const { userId } = req;
    const { name, isGroupChat } = req.body;

    // Checking for missing requirements
    if (!name) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Proceeding with room creation
    const newRoom = await roomModel.query().insert({
        name: name,
        is_group_chat: isGroupChat
    });

    res.status(StatusCodes.OK).json({
        success: true,
        data: newRoom
    });
}

module.exports = {
    roomCreateController
}