const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "private_voices",
    columns: {
        _id: {
            objectId: true,
            primary: true,
            type: "string"
        },
        channelID: {
            type: "string" 
        },
        guildID: {
            type: "string"
        },
        blockedUsers: {
            type: "array"
        },
        mutedUsers: {
            type: "array"
        }
    }
});