// Requirements
const { Model } = require("objection");

class Room extends Model {
    static get tableName() {
        return "room";
    }
}

module.exports = Room;