// Requirements
const messageModel = require("../database/models/message");
const customError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

// [POST] Creates chat message
const messageCreateController = async (req, res) => {
    const { userId } = req;
    const { roomId, content } = req.body;

    // Checking for missing requirements
    if (!roomId | !content) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Proceeding with message creation
    const newMessage = await messageModel.query().insert({
        user_id: userId,
        room_id: roomId,
        content: content
    });

    res.statu(StatusCodes.OK).json({
        success: true,
        data: newMessage
    });
};

module.exports = {
    messageCreateController
}