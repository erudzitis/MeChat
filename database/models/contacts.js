// Requirements
const { Model } = require("objection");

class Contacts extends Model {
    static get tableName() {
        return "contacts";
    }
}

module.exports = Contacts;