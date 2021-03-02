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
        //.setFooter(`${data.message.author.username} | © Night Devs`)
        let perms;
        switch(data.type) {
            case "NotOwner":
                embed.setDescription("Эта функция не для простолюдин!")
                break

            case "BotMissingPermissions":
                perms = data.perms.filter((value)=>data.clientGuild.permissions.has(value) ? false : true)
                embed.setDescription(
                    `У бота отсутствуют права необходимые для данной команды, а именно:\`` +
                    tools.permsToText(perms).join('`, `')+`\`.\n` +
                    `Обратитесь к администратору сервера, чтобы исправить это.`
                );
                break
            case "MissingPermissions":
                perms = data.perms.filter((value)=>data.author.permissions.has(value) ? false : true)
                embed.setDescription(`У вас недостаточно вот этих прав: \n\`${tools.permsToText(perms).join('`, `')}\``);
                break
            default:
                embed.setDescription("Произошла неожиданная ошибка, отчёт уже отправлен разработчикам. Извините за предоставленные неудобства.");
                client.channels.cache.get("770009648023339049").send(
                    new discord.MessageEmbed()
                        .setTitle("Ошибка!")
                        .setDescription(`\`\`\`js\n${data.error}\n\`\`\``)
                        .addField("Автор:", `${data.author} (${data.author.id})`, false)
                        .addField("Контент:", `\`\`\`\n${data.message.content}\n\`\`\``, false)
                        .addField("ID сервера:", data.message.guild.id, false)
                        .addField("ID канала:", data.message.channel.id, false)
                );
                break
        }
        data.message.channel.send(embed);
    }
}