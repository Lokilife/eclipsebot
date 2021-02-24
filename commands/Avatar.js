const {MessageEmbed}  = require("discord.js");
const colors          = require('../config.json').colors;
const errors          = require('../lib/errors.js');

module.exports = {
    "run": async (message, bot, args) => {
        if(!args[0]) {
            return message.channel.send(new MessageEmbed().setColor(colors.default).setTitle(`Вот твой аватар:`).setDescription(`[Если не загрузилось](${message.author.avatarURL({ dynamic: true, size: 4096 }) || message.author.defaultAvatarURL})`).setImage(message.author.avatarURL({ dynamic: true, size: 4096 }) || message.author.defaultAvatarURL).setFooter(bot.helps.footer));
        } else if(args[0] == "server") {
            if(!message.guild.iconURL({ dynamic: true, size: 512 })) return errors.custom(message,`Сервер не имеет аватарки!`);
            return message.channel.send(new MessageEmbed().setColor(colors.default).setTitle(`Аватарка сервера`).setDescription(`[Если не загрузилось](${message.guild.iconURL({ dynamic: true, size: 4096 })})`).setImage(message.guild.iconURL({ dynamic: true, size: 4096 })).setFooter(bot.helps.footer));
        } else {
            let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]));
            if(!aUser) return errors.noUser(message);
            return message.channel.send(new MessageEmbed().setColor(colors.default).setTitle(`Аватар пользователя ${aUser.user.username}:`).setDescription(`[Если не загрузилось](${aUser.user.avatarURL({ dynamic: true, size: 4096 }) || aUser.user.defaultAvatarURL})`).setImage(aUser.user.avatarURL({ dynamic: true, size: 4096 }) || aUser.user.defaultAvatarURL).setFooter(bot.helps.footer));
        } 
    },
    "name": "avatar",
    "aliases": ["avatar", "ava"],
    "help": {
        "category": "Общее",
        "desciption": "Аватар пользователя",
        "shortDescription": "Аватар",
        "usage": "avatar ?[User]",
        "examples": [
            "avatar",
            "avatar @Electroplayer",
        ],
    }
}