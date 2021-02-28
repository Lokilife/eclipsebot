const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "guilds",
    columns: {
        _id: {
            objectId: true,
            primary: true,
            type: "string"
        },
        welcome: {
            type: "json"
        },
        goodbye: {
            type: "json"
        },
        logs: {
            type: "json"
        },
        privateVoices: {
            type: "json"
        },
        premium: {
            type: "string"
        }
    }
});