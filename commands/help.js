const discord = require("discord.js");
const config = require("../config.json");
const tools = require("../lib/tools");

module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @param {Array<String} args
     */
    "run": async function(message, client, args) {
        message.channel.send("Не готово!");
    },
    "name": "help",
    "aliases": ["help", "?", "помощь", "хелп"],
    "help": {
        "category": "Общее",
        "desciption": "Помощь по командам",
        "shortDescription": "Помощь",
        "usage": "help [command]",
        "examples": [
            "help",
            "help ping"
        ],
    }
}