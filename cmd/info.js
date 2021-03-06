const discord   = require('discord.js');
const strftime  = require('strftime').localizeByIdentifier('ru_RU');
const addlib    = require('../addLib.js');
const package   = require('../package.json');

module.exports = {
    run: (bot,message,args,con)=> {try{
        let uptime = addlib.helps.parseMS(bot.uptime);
        let embed = con.defEmb
        .setTitle("Информация о боте")
        .addField("Основное",`Пользователей: \`${bot.users.cache.size}\`\nСерверов: \`${bot.guilds.cache.size}\`\nДата создания: \`${strftime('%d.%m.%Y год в %H:%M', new Date(bot.user.createdTimestamp))}\`\nВремя работы: \`${uptime.days} : ${uptime.hours} : ${uptime.minutes} : ${uptime.seconds}.${uptime.milliseconds}\``)
        .addField("Техническая информация",`Использование ОЗУ:  \`${(process.memoryUsage().rss / 1024 / 1024)
        .toFixed(2)} МБ\`\nВерсия Node.JS: \`${process.version}\`\nВерсия Discord.JS: \`v${discord.version}\`\nВерсия бота: \`${package.version}\`\nРазработчики: \`[ElectroPlayer ✔]#0256\`\nБлагодарности:\n \`[Ueuecoyotl]#4032\` - Ищет грамматические ошибки.\n\`Lookins#4727\` - Ищет неправильно работающие команды.\n\`𝓐𝓤𝓣𝓞𝓟𝓛𝓐𝓨𝓔𝓡 [BF]#4324\` - Хостит бота на своём сервере.`)
        .addField("Полезные ссылки", "[Сервер поддержки](https://discord.gg/YM3KMDM)\n[GitHub бота](https://github.com/Elektroplayer/eclipsebot)\n[Ссылка на бота](https://discord.com/api/oauth2/authorize?client_id=769659625129377812&permissions=1359473878&scope=bot)\n[На чай](https://www.donationalerts.com/r/electroplayer)",true)
        .addField("Мониторинги (проголосуй :з):", "[top.gg](https://top.gg/bot/769659625129377812/vote)\n[boticord](https://boticord.top/bot/769659625129377812)\n[bots.server-discord](https://bots.server-discord.com/769659625129377812)\n[topcord](https://bots.topcord.ru/bots/769659625129377812/vote)",true)
        .setImage("attachment://banner.png")
        .setFooter(con.footer);
    
        message.channel.send({embed: embed, files: [new discord.MessageAttachment("./img/banner.png", 'banner.png')]});

        return;
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["info","bot", "botinfo"],
    desc: "Информация о боте",
    category: "Общее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}info** - Информация о боте`)
        .addField('Другие алиасы:',`${con.prefix}bot, ${con.prefix}botinfo`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}