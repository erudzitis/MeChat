// Requirements
const messageModel = require("../database/models/message");
const customError = require("../errors/customError");
const participantsModel = require("../database/models/participants");
const { StatusCodes } = require("http-status-codes");

// [POST] Creates chat message
const messageCreateController = async (req, res) => {
    const { userId, userUsername } = req;
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

    // Updating last read timestamp
    await participantsModel.query()
        .where("room_id", roomId)
        .andWhere("user_id", userId)
        .update({
            read_at: new Date()
        });

    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            ...{ ...newMessage, username: userUsername },
            created_at: new Date() // timestamps are not being returned after insertion ...
        } 
    });
};

module.exports = {
    messageCreateController
}