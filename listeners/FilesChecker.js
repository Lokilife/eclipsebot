// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require("discord.js");
const urllib = require("urllib");
const config = require("../config.json");

module.exports = {
    name: "message",
    /**
     * @param {Client} client
     * @param {Message} message 
     */
    run: async function(client, message) {
        if (!message.attachments.size) return;
        let VTApiResults = new Map();
        message.attachments = message.attachments.filter(v=>v.name.endsWith(".exe"));
        for (const attachment of message.attachments.values()) {
            if (!attachment.name.endsWith(".exe")) continue;
            urllib.request('https://www.virustotal.com/vtapi/v2/url/scan', {
                type: "POST",
                data: {
                    "apikey": config.virusTotalIpiKey,
                    "url": attachment.url
                }
            }, function(err, data /*, res*/) {
                VTApiResults.push(JSON.parse(data.toString()).permalink);
                console.log(data.toString());
            });
        }
        if (!VTApiResults.size) return;
        let VTApiResultsString = "";
        for (let [key, value] of VTApiResults) {
            VTApiResultsString+=`[\`${key}\`](${value}})\n`;
        }
        const embed = new MessageEmbed()
        .setColor(config.colors.default)
        .setTitle("Проверка исполняемых файлов на вирусы")
        .setDescription(`**Результаты проверки:**\n${VTApiResultsString}\n\n`+
                        `Данное сообщение отправлено автоматически, потому что `+
                        `администратор вашего сервера включил автоматическую проверку исполняемых файлов.`)
        .setFooter(`VirusTotal Auto Checker | © Night devs`);
        //console.log("Test");
        await message.channel.send(embed);
    }
}