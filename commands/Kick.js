const config          = require('../config.json');
const {MessageEmbed}  = require('discord.js');

module.exports = {
    "run": async (message) => {
        message.channel.send(new MessageEmbed().setColor(config.colors.warnOrange).setTitle(`Временно не работает!`))
    },
    "aliases": ["kick"],
    "help": {
        "category": "Модерация",
        "description": "Выгонит человека с сервера",
        "arguments": `**<user> <reason || Нет>** - Выгнать человека по указанной причине *(Можно ввести ID или имя)*`,
        "usage": `**${config.prefix}kick @Electroplayer Спамер** - Выгонит Электроплэера по причине "Спамер"\n**${config.prefix}kick @Electroplayer** - Молча выгоняем Electroplayer`,
    },
    "botPermissions": ["KICK_MEMBERS"],
    "userPermissions": ["KICK_MEMBERS"]
}
