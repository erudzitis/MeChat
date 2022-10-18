// Requirements
const { Model } = require("objection");
const jwt = require("jsonwebtoken");

class User extends Model {
    static get tableName() {
        return "user";
    }

    generateJWT() {
        return jwt.sign({ id: this.id, username: this.username, email: this.email }, process.env.JWT_SECRET);
    }
}

module.exports = User;