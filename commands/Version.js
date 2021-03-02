const config          = require('../config.json');
const {MessageEmbed}  = require('discord.js');
const versions        = require('../versions.json');
const package         = require('../package.json');
const errors          = require('../lib/errors.js');

module.exports = {
    "run": async (message, bot, args) => {
        let ver = args[0] || package.version;

        if(ver == "list") {
            let vers = [];
            for (let key in versions) vers.push(key);

            message.channel.send(new MessageEmbed().setColor(config.colors.default).setTitle(`Список всех выпущенных версий:`).setFooter(bot.helps.footer)
            .setDescription(vers.join(', ')))
            return
        }
        if(!versions[ver]) return errors.custom(message, "Такой версии не существует!");

        let embed = new MessageEmbed().setColor(config.colors.default).setTitle(`Версия: ${ver}`).setFooter(bot.helps.footer);

        if(versions[ver].new)  embed.addField('Новое:',versions[ver].new);
        if(versions[ver].edit) embed.addField('Изменено:', versions[ver].edit);
        if(versions[ver].bugs) embed.addField('Исправления багов:',versions[ver].bugs);
        if(versions[ver].desc) embed.addField('Что нового:',versions[ver].desc);

        message.channel.send(embed);

    },
    "name": "version",
    "aliases": ["version", "ver"],
    "help": {
        "category": "Общее",
        "description": "Задержки Discord API",
        "arguments": `**Нет**`,
        "usage": `**${config.prefix}ping** - Показать скорость соединения от хоста до серверов Discord`,
        "usageLevel": 0
    }
}