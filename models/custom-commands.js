const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "custom_commands",
    columns: {
        _id: {
            objectId: true,
            primary: true,
            type: "string"
        },
        name: {
            type: "string"
        },
        embed: {
            type: "json"
        },
        message: {
            type: "string"
        }
    }
});