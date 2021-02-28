const discord = require("discord.js");
const config = require("../config.json");
const tools = require("../lib/tools");

module.exports = {
    name: "commandError",
    /**
     * 
     * @param {discord.Client} client 
     * @param {*} data 
     */
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
                embed.setDescription(
                    `У бота отсутствуют права необходимые для данной команды. \`` +
                    tools.permsToText(perms).join('`, `')+`\`.\n` +
                    `Обратитесь к администратору вашего сервера чтобы исправить это.`
                );
                break
            case "MissingPermissions":
                perms = data.perms.filter((value)=>data.author.permissions.has(value) ? false : true)
                embed.setDescription(`У вас недостаточно прав.\n\`${tools.permsToText(perms).join('`, `')}\``);
                break
            default:
                embed.setDescription("Произошла неожиданная ошибка, отчёт уже отправлен разработчикам. Извините за предоставленные неудобства.");
                client.channels.cache.get("770009648023339049").send(
                    new discord.MessageEmbed()
                        .setTitle("Ошибка!")
                        .setDescription(`\`\`\`js\n${data.error}\n\`\`\``)
                        .addField("Message Author", `${data.author} (${data.author.id})`, false)
                        .addField("Message Content", `\`\`\`\n${data.message.content}\n\`\`\``, false)
                        .addField("Guild ID", data.message.guild.id, false)
                        .addField("Channel ID", data.message.channel.id, false)
                );
                break
        }
        data.message.channel.send(embed);
    }
}