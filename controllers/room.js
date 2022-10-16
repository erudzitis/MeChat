// Requirements
const roomModel = require("../database/models/room");
const userModel = require("../database/models/user");
const participantsModel = require("../database/models/participants");
const messageModel = require("../database/models/message");
const customError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

// [POST] Route for creating chat rooms
const roomCreateController = async (req, res) => {
    // TODO: append userId after successful authorization to the request
    const { userId } = req;
    const { name, description, groupUsers, isGroupChat } = req.body;

    // Checking for missing requirements
    if (!name) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Proceeding with room creation
    const newRoom = await roomModel.query().insert({
        name: name,
        description: description,
        admin_id: isGroupChat ? userId : null,
        is_group_chat: isGroupChat
    });

    // Adding request user as participant to the group
    await participantsModel.query().insert({
        user_id: userId,
        room_id: newRoom.id
    });

    // Adding array of group users to our group
    if (groupUsers && groupUsers?.length) {
        // Creating users object list
        const groupUsersData = groupUsers.map(groupUserId => {
            return {
                user_id: groupUserId,
                room_id: newRoom.id
            }
        })

        // Creating participants instances
        await participantsModel.query().insert(groupUsersData);
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: newRoom
    });
}

// [POST] Route for leaving chat rooms
const roomLeaveController = async (req, res) => {
    const { userId } = req;
    const { roomId } = req.body;

    // Checking for missing requirements
    if (!roomId) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Deleting participation
    await participantsModel.query()
        .delete()
        .where("user_id", userId)
        .andWhere("room_id", roomId);

    res.status(StatusCodes.OK).json({
        success: true,
        data: { leftRoomId: roomId }
    });
}

// [POST] Route for adding users to chat rooms
const roomAddUserController = async (req, res) => {
    const { userId } = req;
    // Users will be added based on their username
    const { targetId, roomId } = req.body;

    // Checking for missing requirements
    if (!targetId || !roomId) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Checking whether provided user exists
    const providedUser = await userModel.query().findOne({
        id: targetId
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
    if (providedRoom.is_group_chat && providedRoom.admin_id !== userId) {
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

// [GET] Route for retrieving room data
const getRoomDataController = async (req, res) => {
    const { userId } = req;
    const { roomId } = req.params;

    // Checking for missing requirements
    if (!roomId) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Checking whether request user has access to the desired room
    const isParticipant = await participantsModel.query().findOne({
        user_id: userId,
        room_id: roomId
    });

    // User is not participant of the group, therefore has not permissions to access it
    if (!isParticipant) {
        throw new customError("You don't have permissions to view this room!", StatusCodes.UNAUTHORIZED);
    }

    // Fetching all other room participants
    const allParticipants = await participantsModel.query()
        .join("user", "user.id", "participants.user_id")
        .select("user.username", "user.id")
        .where("room_id", roomId);

    // Fetching latest messages
    const roomMessages = await messageModel.query()
        .join("user", "user.id", "message.user_id")
        .select("message.user_id", "user.username", "message.content", "message.created_at")
        .where("room_id", roomId);

    res.status(StatusCodes.OK).json({
        success: true,
        data: {
            messages: roomMessages,
            participants: allParticipants,
        }
    });
}

module.exports = {
    roomCreateController,
    roomLeaveController,
    roomAddUserController,
    getRoomDataController
}