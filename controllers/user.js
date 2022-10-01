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

    // Querying all contacts
    const allContacts = await contactsModel.query()
        .where("user_id_1", userId)
        .orWhere("user_id_2", userId);

    // Retrieving all contacts id's list
    const allContactsIds = allContacts.map(contact => {
        return contact.user_id_1 == userId ? contact.user_id_2 : contact.user_id_1;
    })

    // Retrieving users from contacts
    const allContactsUsers = await userModel.query()
        .whereIn("id", allContactsIds)
        .select("id", "username");

    res.status(StatusCodes.OK).json({
        success: true,
        data: allContactsUsers
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

    // Creating contact instance
    const newContact = await contactsModel.query().insert({
        user_id_1:  userId,
        user_id_2: contactUserId
    });

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