const discord   = require('discord.js');
const strftime  = require('strftime').localizeByIdentifier('ru_RU');
const addlib    = require('../addLib.js');
const package   = require('../package.json');
const moment    = require("moment");
require("moment-duration-format");

module.exports = {
    run: (bot,message,args,con)=> {try{
        let embed = con.defEmb
        .setTitle("Информация о боте")
        .addField("Основное",`Пользователей: \`${bot.users.cache.size}\`\nСерверов: \`${bot.guilds.cache.size}\`\nДата создания: \`${strftime('%d.%m.%Y год в %H:%M', new Date(bot.user.createdTimestamp))}\`\nВремя работы: \`${moment.duration(bot.uptime).format(" D [д] : H [ч] : mm [м] ss.SSS [с]")}\``)
        .addField("Техническая информация",`Использование ОЗУ:  \`${(process.memoryUsage().rss / 1024 / 1024)
        .toFixed(2)} МБ\`\nВерсия Node.JS: \`${process.version}\`\nВерсия Discord.JS: \`v${discord.version}\`\nВерсия бота: \`${package.version}\`\nРазработчики: \`[ElectroPlayer ✔]#0256\`\nБлагодарности:\n \`[Ueuecoyotl]#4032\` - Ищет грамматические ошибки.\n\`Lookins#4727\` - Ищет неправильно работающие команды.\n\`𝓐𝓤𝓣𝓞𝓟𝓛𝓐𝓨𝓔𝓡 [BF]#4324\` - Хостит бота на своём сервере.`)
        .addField("Полезные ссылки", "[Сервер поддержки](https://discord.gg/YM3KMDM) | [GitHub бота](https://github.com/Elektroplayer/eclipsebot) | [Ссылка на бота](https://discord.com/api/oauth2/authorize?client_id=769659625129377812&permissions=1359473878&scope=bot)")
        .setImage("https://cdn.discordapp.com/attachments/770009593131827300/770256444988850197/banner.png")
        .setFooter(con.footer);
    
        message.channel.send(embed);

        return;
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}info`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
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