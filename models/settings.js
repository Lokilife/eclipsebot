const mongoose = require("mongoose");

const xpSchema = mongoose.Schema({
    serverID: String,
    wellcome: Object,
    goodbye: Object,
    privatVoices: Object,
    other: Object
})

module.exports = mongoose.model("setting", xpSchema)