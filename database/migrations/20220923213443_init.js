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
            .createTable("room", (table) => {
                table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
                table.integer("admin_id").references("user.id").nullable();
                table.string("name").nullable();
                table.string("description").nullable();
                table.string("picture").nullable();
                table.boolean("is_group_chat").defaultTo(false);
                table.timestamps(true, true);
            })
            .createTable("message", (table) => {
                table.increments("id").primary();
                table.integer("user_id").references("user.id").onDelete("CASCADE");
                table.uuid("room_id").references("room.id").onDelete("CASCADE");
                table.text("content").notNullable();
                table.timestamps(true, true);
            })
            .createTable("participants", (table) => {
                table.increments("id").primary();
                table.integer("user_id").references("user.id").onDelete("CASCADE");
                table.uuid("room_id").references("room.id").onDelete("CASCADE"); 
                table.timestamps(true, true);           
            })
            .createTable("contacts", (table) => {
                table.increments("id").primary();
                table.integer("user_id_1").references("user.id").onDelete("CASCADE");
                table.integer("user_id_2").references("user.id").onDelete("CASCADE");
                table.uuid("room_id").references("room.id").onDelete("CASCADE"); 
                table.timestamps(true, true);
            })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // Need to use raw queries, because CASCADE can't be called otherwise...
    return knex
        .raw("DROP TABLE user CASCADE")
        .raw("DROP TABLE room CASCADE")
        .raw("DROP TABLE message CASCADE")
        .raw("DROP TABLE participants CASCADE")
        .raw("DROP TABLE contacts CASCADE");
};
