const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "custom",
    columns: {
        _id: { // Guild ID
            objectId: true,
            primary: true,
            type: "string"
        },
        user: { // ID пользователя
            type: "number"
        },
        header: {
            type: "json"
        },
        fields: {
            type: "array"
        },
        image: {
            type: "string"
        },
        line: {
            type: "number"
        }
    }
});