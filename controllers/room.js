// Requirements
const roomModel = require("../database/models/room");
const userModel = require("../database/models/user");
const participantsModel = require("../database/models/participants");
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
        admin_id: isGroupChat ? userId : null,
        is_group_chat: isGroupChat
    });

    res.status(StatusCodes.OK).json({
        success: true,
        data: newRoom
    });
}

// [POST] Route for adding users to chat rooms
const roomAddUserController = async (req, res) => {
    const { userId } = req;
    // Users will be added based on their username
    const { userUsername, roomId } = req.body;

    // Checking for missing requirements
    if (!userUsername | !roomId) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Checking whether provided user exists
    const providedUser = await userModel.query().findOne({
        username: userUsername
    });

    // User was not found
    if (!providedUser) {
        throw new customError("User not found!", StatusCodes.NOT_FOUND);
    }

    // Checking whether provided room exists
    const providedRoom = await roomModel.query().findById(roomId);

    // Room was not found
    if (!providedRoom) {
        throw new customError("Room not found!", StatusCodes.NOT_FOUND)
    }

    // Checking whether user has permissions to add other users to the group. Respectively in group chats, only admins should be able to add users,
    // however, in 1-1 chats, both people can establish the chat group
    if (providedRoom.is_group_chat && !providedRoom.admin_id !== userId) {
        throw new customError("You don't have admin permissions to add users to the group!", StatusCodes.UNAUTHORIZED);
    }

    // Proceed with M-T-M relationship creation
    const newParticipant = await participantsModel.query().insert({
        user_id: providedUser.id,
        room_id: providedRoom.id
    });

    res.status(StatusCodes.OK).json({
        success: true,
        data: newParticipant
    });
}

module.exports = {
    roomCreateController,
    roomAddUserController
}