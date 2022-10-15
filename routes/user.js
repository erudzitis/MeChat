// Requirements
const router = require("express").Router();

// Controllers
const { retrieveContacts, createContact, removeContact, retrieveRooms } = require("../controllers/user");

// [POST]
router.post("/create_contact", createContact);
router.post("/remove_contact", removeContact)

// [GET]
router.get("/contacts", retrieveContacts);
router.get("/rooms", retrieveRooms);

module.exports = router;