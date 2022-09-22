const { Model } = require("objection");
const Knex = require("knex");

// Initialize knex.
const pgDBInstance = Knex({
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
});

// Give the knex instance to objection.
Model.knex(pgDBInstance);

// Exporting the connection instance
module.exports = pgDBInstance;