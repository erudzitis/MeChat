// Requirements
const { Model } = require("objection");
const jwt = require("jsonwebtoken");

class User extends Model {
    static get tableName() {
        return "user";
    }

    generateAccessToken() {
        return jwt.sign({ id: this.id, username: this.username, email: this.email },
             process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    }

    generateRefreshToken() {
        return jwt.sign({ id: this.id, username: this.username, email: this.email },
             process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    }
}

module.exports = User;