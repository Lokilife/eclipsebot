const addlib   = require('../addLib.js');
const package  = require('../package.json');
const versions = require('../versions.json');
module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) {
            message.channel.send(con.defEmb.setTitle(`Что нового было добавлено в версии ${package.version}`).setFooter(con.footer)
            .setDescription(versions[package.version]))
        } else {
            if(versions[args[0]]) message.channel.send(con.defEmb.setTitle(`Версия: ${package.version}`).setFooter(con.footer)
            .setDescription(versions[args[0]]))
            else addlib.errors.castom(message, "Такой версии не существует!")
        }
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
        .addField('Другие алиасы:',`${con.prefix}ver`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}