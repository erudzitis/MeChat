require("dotenv").config();

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