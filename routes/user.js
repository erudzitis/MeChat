// Requirements
const router = require("express").Router();

// Controllers
const { retrieveContacts, createContact, retrieveRooms } = require("../controllers/user");

// [POST]
router.post("/create_contact", createContact);

// [GET]
router.get("/contacts", retrieveContacts);
router.get("/rooms", retrieveRooms);

module.exports = router;