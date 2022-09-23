// Requirements
const { Model } = require("objection");

class Room extends Model {
    static get tableName() {
        return "room";
    }

    static get relationMappings() {
        const userModel = require("./user");

        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: userModel,
                join: {
                    from: "room.id",
                    to: "user.id",
                    through: {
                        from: "participants.room_id",
                        to: "participants.user_id"
                    }
                }
            }            
        }
    };    
}

module.exports = Room;