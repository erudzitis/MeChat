/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("user", (table) => {
            table.increments("id").primary();
            table.string("username").notNullable().unique();
            table.string("password").notNullable();
            table.string("email").notNullable().unique();
            table.timestamps(true, true);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("user");
};
