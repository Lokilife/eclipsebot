const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "custom",
    columns: {
        _id: {
            objectId: true,
            primary: true,
            type: "string"
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