// Requirements
const { Model } = require("objection");

class Participants extends Model {
    static get tableName() {
        return "participants";
    }
}

module.exports = Participants;