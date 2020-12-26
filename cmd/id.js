const addlib  = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return message.channel.send(con.defEmb.setTitle(`ID канала "${message.channel.name}": ${message.channel.id}`))

        let channelRaw = message.mentions.channels.first() || message.guild.channels.cache.find(n=> n.name == args[0])
        if(!channelRaw) return addlib.errors.noChannel(message)
        message.channel.send(con.defEmb.setTitle(`ID канала "${channelRaw.name}":`).setDescription(`${channelRaw.id}`))
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["id"],
    desc: "Узнай id канала",
    category: "Общее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<channelName || #channel>** - Упоминание или имя канала`)
        .addField('Примеры:',`**${con.prefix}id основной** - Напишет id канала с именем "основной". Работает на категориях`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}