const addlib = require('../addLib.js');
module.exports = {
    run: async (bot,message,args,con)=> {try{
        message.channel.send(con.defEmb.setTitle("Версия 0.0.0").setFooter(con.footer)
        .setDescription('Бот находится в разработке и версий пока что не имеет.\nНе все команды могут работать!'))
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
    show: true
}