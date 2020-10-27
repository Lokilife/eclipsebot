const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
    serverID: String,
    wellcome: Object,
    goodbye: Object,
    privatVoises: Object,
    other: Object
})

module.exports = mongoose.model("setting", xpSchema)