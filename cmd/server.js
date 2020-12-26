const strftime = require("strftime").localizeByIdentifier('ru_RU');
const addlib = require('../addLib.js');
module.exports = {
    run: (bot,message,args,con)=> {try{
        message.channel.send(con.defEmb
        .setTitle(`Информация о сервере "${message.guild.name}"`)
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
        .addField("Создан:", strftime('%B %d, %Y год, в %H:%M', message.guild.createdAt))
        .addField("Создатель:", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
        .addField("Участников всего | из них людей | онлайн | ботов:", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => !member.user.bot && member.presence.status !== 'offline').size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`)
        .addField("Ролей:", message.guild.roles.cache.size,true)
        .addField('ID:', message.guild.id,true)
        .setFooter(con.footer));
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["server"],
    desc: "Описание сервера",
    category: "Общее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}server** - Показать информацию о сервере`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}