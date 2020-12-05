const strftime = require("strftime").localizeByIdentifier('ru_RU');
const addlib = require('../addLib.js');
module.exports = {
    run: (bot,message,args,con)=> {try{
        message.channel.send(con.defEmb
        .setTitle("Информация о сервере")
        .setThumbnail(message.guild.iconURL())
        .addField("Имя сервера:", message.guild.name)
        .addField("Создан:", strftime('%B %d, %Y год в %H:%M', message.guild.createdAt))
        .addField("Создатель:", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Участников всего | из них людей | онлайн | ботов:", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => !member.user.bot && member.presence.status !== 'offline')} | ${message.guild.members.cache.filter(member => member.user.bot).size}`,true)
        .addField("Ролей:", message.guild.roles.cache.size, true)
        .addField('ID:', message.guild.id)
        .setFooter(con.footer));
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}server`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
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