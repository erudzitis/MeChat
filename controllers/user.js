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
        .select("user.id", "user.username", "user.email", "contacts.room_id")
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
    const { contactEmail } = req.body;

    // Missing parameters
    if (!contactEmail) {
        throw new customError("Post body parameters missing!", StatusCodes.BAD_REQUEST);
    }

    // Checking whether a user with provided email exists
    const contactUser = await userModel.query().findOne({
        email: contactEmail
    }); 

    // No user found
    if (!contactUser) {
        throw new customError("No user found!", StatusCodes.NOT_FOUND);
    }

    // Room is automatically created between two users
    const newRoom = await roomModel.query().insert({
        admin_id: null,
        name: null,
        description: null,
    });    

    // Creating contact instance
    await contactsModel.query().insert({
        user_id_1: userId,
        user_id_2: contactUser.id,
        room_id: newRoom.id
    });

    // Adding both participants to the room
    await participantsModel.query().insert({ user_id: userId, room_id: newRoom.id });
    await participantsModel.query().insert({ user_id: contactUser.id, room_id: newRoom.id });

    res.status(StatusCodes.OK).json({
        success: true,
        data: { id: contactUser.id, username: contactUser.username, email: contactUser.email, room_id: newRoom.id }
    });
}

const removeContact = async (req, res) => {
    const { userId } = req;
    const { contactId } = req.body;

    // Retrieving existing contact 
    const contact = await contactsModel.query()
        .where("user_id_1", userId).andWhere("user_id_2", contactId)
        .orWhere("user_id_1", contactId).andWhere("user_id_2", userId);
        
    // Contact not found
    if (!contact) {
        throw new customError("Contact not found!", StatusCodes.NOT_FOUND);
    }

    // Since contact returns a list, we extract the first found room id
    const roomId = contact[0].room_id;

    // Removing room. We don't need to specifically delete the contact, since it will be automatically cascaded once the room is deleted
    await roomModel.query().deleteById(roomId);

    res.status(StatusCodes.OK).json({
        success: true,
        data: { removedContactId: contactId, removedRoomId: roomId }
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
    removeContact,
    retrieveRooms
}