// Requirements
const { Model } = require("objection");

class Message extends Model {
    static get tableName() {
        return "message";
    }
}

module.exports = Message;