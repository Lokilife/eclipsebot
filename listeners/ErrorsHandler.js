const discord = require("discord.js");
const config = require("../config.json");
const tools = require("../lib/tools");

module.exports = {
    name: "commandError",
    run: async function (client, data) {
        const embed = new discord.MessageEmbed()
        .setColor(config.colors.errorRed)
        .setTitle("Ошибка!")
        .setFooter(`${data.message.author.username} | © Night Devs`)
        let perms;
        switch(data.type) {
            case "NotOwner":
                embed.setDescription("Вы не являетесь владельцем бота!")
                break

            case "BotMissingPermissions":
                perms = data.perms.filter((value)=>data.clientGuild.permissions.has(value) ? false : true)
                embed.setDescription(`У бота отсутствуют права необходимые для данной команды: \`${tools.permsToText(perms).join('`, `')}\``);
                break
            case "MissingPermissions":
                perms = data.perms.filter((value)=>data.author.permissions.has(value) ? false : true)
                embed.setDescription(`У вас недостаточно прав.\n\`${tools.permsToText(perms).join('`, `')}\``);
                break
            default:
                embed.setDescription("Произошла неожиданная ошибка, отчёт уже отправлен разработчикам. Извините за предоставленные неудобства.");
                break
        }
        data.message.channel.send(embed);
    }
}