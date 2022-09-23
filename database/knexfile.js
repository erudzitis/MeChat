// Loading env variables
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Stores DB configuration
module.exports = {
    development: {
        client: "pg",
        connection: process.env.PG_CONNECTION_STRING_DEV,
        migrations: {
            tableName: "knex_migrations"
        }
    }
};