// Requirements
const contactsModel = require("../database/models/contacts");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors/customError");

// [POST] Used to retrieve all request users contacts
const retrieveContacts = async (req, res) => {
    const { userId } = req;

    // Querying all contacts
    const allContacts = await contactsModel.query().where("user_id_1", "like", userId).orWhere("user_id_2", "like", userId);

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

module.exports = {
    retrieveContacts,
    createContact
}