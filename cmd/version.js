const addlib   = require('../addLib.js');
const package  = require('../package.json');
const versions = require('../versions.json');
module.exports = {
    run: async (bot,message,args,con)=> {try{
        let ver = args[0] || package.version;
        if(ver == "list") {
            message.channel.send(con.defEmb.setTitle(`Список всех выпущенных версий:`).setFooter(con.footer)
            .setDescription("1.0.0\n1.0.1\n1.1.0\n1.1.1\n1.1.2\n1.2.0\n1.3.0\n1.4.0\n1.4.1\n1.5.0"))
            return
        }
        if(!versions[ver]) return addlib.errors.castom(message, "Такой версии не существует!");

        let embed = con.defEmb.setTitle(`Версия: ${ver}`).setFooter(con.footer);

        if(versions[ver].new)  embed.addField('Новое:',versions[ver].new);
        if(versions[ver].edit) embed.addField('Изменено:', versions[ver].edit);
        if(versions[ver].bugs) embed.addField('Исправления багов:',versions[ver].bugs);
        if(versions[ver].desc) embed.addField('Что нового:',versions[ver].desc);

        message.channel.send(embed);

    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
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