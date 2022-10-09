// Requirements
const contactsModel = require("../database/models/contacts");
const participantsModel = require("../database/models/participants");
const roomModel = require("../database/models/room");
const userModel = require("../database/models/user");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors/customError");

// [POST] Used to retrieve all request users contacts
const retrieveContacts = async (req, res) => {
    const { userId } = req;

    // Querying all contacts. Since relationship is both ways, it's a bit tricky to extract correct contacts
    const allContacts = await contactsModel.query()
        .where("user_id_1", userId)
        .orWhere("user_id_2", userId)
        .join("user", function() {
            this
                .on("user.id", "contacts.user_id_1")
                .orOn("user.id", "contacts.user_id_2")
        })
        .select("user.id", "user.username", "contacts.room_id")
        .having("user.id", "!=", userId)
        .groupBy("user.id", "user.username", "contacts.room_id");

    res.status(StatusCodes.OK).json({
        success: true,
        data: allContacts
    });
}

// [POST] Used for establishing contacts between users
const createContact = async (req, res) => {
    const { userId } = req;
    const { contactUserId } = req.body;

    // Missing parameters
    if (!contactUserId) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Room is automatically created between two users
    const newRoom = await roomModel.query().insert({
        admin_id: null,
        name: null,
        description: null,
    });    

    // Creating contact instance
    const newContact = await contactsModel.query().insert({
        user_id_1: userId,
        user_id_2: contactUserId,
        room_id: newRoom.id
    });

    // Adding both participants to the room
    await participantsModel.query().insert({ user_id: userId, room_id: newRoom.id });
    await participantsModel.query().insert({ user_id: contactUserId, room_id: newRoom.id });

    res.status(StatusCodes.OK).json({
        success: true,
        data: newContact
    });
}

// [POST] Used for retrieving request user rooms
const retrieveRooms = async (req, res) => {
    const { userId } = req;
    
    // Querying all participated rooms
    const allParticipations = await participantsModel.query()
        .where("user_id", userId)
        .select("room_id");

    const allRoomIndexes = allParticipations.map(participation => {
        return participation.room_id;
    })

    // Querying all roms
    const allRooms = await roomModel.query()
        .whereIn("id", allRoomIndexes)
        .andWhere("is_group_chat", true);

    res.status(StatusCodes.OK).json({
        success: true,
        data: allRooms
    })
}

module.exports = {
    retrieveContacts,
    createContact,
    retrieveRooms
}