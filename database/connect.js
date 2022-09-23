const knex = require("knex");
const knexFile = require("./knexfile");
const { Model } = require("objection");

// Setup db
const db = knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(db);