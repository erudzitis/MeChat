require("dotenv").config();

// Stores DB configuration
module.exports = {
    development: {
        client: "pg",
        connection: "",
        migrations: {
            tableName: "knex_migrations"
        }
    }
};