// Requirements
const router = require("express").Router();

// Controllers
const { retrieveContacts, createContact, retrieveGroups } = require("../controllers/user");

// [POST]
router.post("/create_contact", createContact);

// [GET]
router.get("/contacts", retrieveContacts);
router.get("/groups", retrieveGroups);

module.exports = router;