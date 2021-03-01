const {MessageEmbed}  = require("discord.js");
const config          = require('../config.json');
const errors          = require('../lib/errors.js');

module.exports = {
    "run": async (message, bot, args) => {
        if(!args[0]) {
            return message.channel.send(new MessageEmbed().setColor(config.colors.default).setTitle(`Вот твой аватар:`).setDescription(`[Если не загрузилось](${message.author.avatarURL({ dynamic: true, size: 4096 }) || message.author.defaultAvatarURL})`).setImage(message.author.avatarURL({ dynamic: true, size: 4096 }) || message.author.defaultAvatarURL).setFooter(bot.helps.footer));
        } else if(args[0] == "server") {
            if(!message.guild.iconURL({ dynamic: true, size: 512 })) return errors.custom(message,`Сервер не имеет аватарки!`);
            return message.channel.send(new MessageEmbed().setColor(config.colors.default).setTitle(`Аватарка сервера`).setDescription(`[Если не загрузилось](${message.guild.iconURL({ dynamic: true, size: 4096 })})`).setImage(message.guild.iconURL({ dynamic: true, size: 4096 })).setFooter(bot.helps.footer));
        } else {
            let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]));
            if(!aUser) return errors.noUser(message);
            return message.channel.send(new MessageEmbed().setColor(config.colors.default).setTitle(`Аватар пользователя ${aUser.user.username}:`).setDescription(`[Если не загрузилось](${aUser.user.avatarURL({ dynamic: true, size: 4096 }) || aUser.user.defaultAvatarURL})`).setImage(aUser.user.avatarURL({ dynamic: true, size: 4096 }) || aUser.user.defaultAvatarURL).setFooter(bot.helps.footer));
        } 
    },
    "name": "avatar",
    "aliases": ["avatar", "ava"],
    "help": {
        "category": "Общее",
        "desciption": "Аватар пользователя",
        "arguments": `**<user || автор>** - Покажет аватар упомянутого пользователя *(Можно ввести ID или имя)*`,
        "usage": `**${config.prefix}avatar** - Покажет твой аватар\n**${config.prefix}avatar @user** - Покажет аватар упомянутого пользователя\n**${config.prefix}avatar 111111123456789101** - Покажет аватар пользователя с таким ID\n**${config.prefix}avatar UserName** - Покажет аватар пользователя с таким именем *(НЕ НИКОМ НА СЕРВЕРЕ)*\n**${config.prefix}avatar server** - Покажет аватар сервера`,
        "usegeLevel": 0
    }
}