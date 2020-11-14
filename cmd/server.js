const strftime = require("strftime").localizeByIdentifier('ru_RU');
const addlib = require('../addLib.js');
module.exports = {
    run: (bot,message,args,con)=> {try{
        if(args[0] == "help") {
            return message.channel.send(con.defEmb.setTitle("Тебе серьёзно нужна помощь по этой команде?").setDescription("Мне лень)").setFooter(con.footer))
        }

        let notbots = message.guild.members.cache.filter(member => !member.user.bot)
        message.channel.send(con.defEmb
        .setTitle("Информация о сервере")
        .setThumbnail(message.guild.iconURL())
        .addField("Имя сервера:", message.guild.name)
        .addField("Создан:", strftime('%B %d, %Y год в %H:%M', message.guild.createdAt))
        .addField("Всего людей:", notbots.size,true)
        .addField('Людей онлайн:', notbots.filter(m => m.presence.status !== 'offline').size,true)
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