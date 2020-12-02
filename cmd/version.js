const addlib = require('../addLib.js');
module.exports = {
    run: async (bot,message,args,con)=> {try{
        message.channel.send(con.defEmb.setTitle("Версия 1.0.0").setFooter(con.footer)
        .setDescription('Бот только что релизнулся. Посети эту команду позже)\nНашёл баг или ошибку? Напиши в поддержку или через `e.feedback <проблема>`'))
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}version`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["version","ver"],
    desc: "Что изменилось в последней версии",
    category: "Общее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}version** - Версия бота и что нового`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}