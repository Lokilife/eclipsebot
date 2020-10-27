const discord   = require('discord.js');
const strftime  = require('strftime').localizeByIdentifier('ru_RU');

module.exports = {
    run: (bot,message,args,con)=> {try{
        if(args[0] == "help") {
            return message.channel.send(con.defEmb.setTitle("Тебе серьёзно нужна помощь по этой команде?").setDescription("Мне лень)").setFooter(con.footer))
        }

        let embed = con.defEmb
        .setFooter(`Для ${message.author.tag}`)
        .setTitle("Информация о боте")
        .addField("Основное",`Пользователей: \`${bot.users.cache.size}\`\nСерверов: \`${bot.guilds.cache.size}\`\nДата создания: \`${strftime('%d.%m.%Y год в %H:%M', new Date(bot.user.createdTimestamp))}\``)
        .addField("Техническая информация",`Использование ОЗУ:  \`${(process.memoryUsage().heapUsed / 1024 / 1024)
        .toFixed(2)} МБ\`\nВерсия Node.JS: \`${process.version}\`\nВерсия Discord.JS: \`v${discord.version}\`\nВерсия бота: \`v0.0.0\`\nРазработчики: \`[ElectroPlayer ✔]#0256\`, \`Tegnio#6882\``)
        .addField("Полезные ссылки", "[Сервер поддержки](https://discord.gg/YM3KMDM) | [GitHub бота](https://github.com/Elektroplayer/eclipsebot) | [Ссылка на бота](https://discord.com/api/oauth2/authorize?client_id=769659625129377812&permissions=872934480&scope=bot)")
        .setImage("https://cdn.discordapp.com/attachments/770009593131827300/770256444988850197/banner.png")
        .setFooter(con.footer);
    
        message.channel.send(embed);

        return;
    }catch(err){console.log(err)}},
    cmd: ["info","bot"],
    desc: "Информация о боте",
    category: "Общее"
}