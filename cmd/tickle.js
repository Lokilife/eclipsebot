const addlib  = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return addlib.errors.notArgs(message,"Упомяни того, кого хочешь пощекотать");
        if(!message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]))) return addlib.errors.noUser(message);
        
        let username = `${message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0])).user.username}`
        let rand = Math.floor(Math.random()*20)+1;

        message.channel.send(con.defEmb.setTitle(`${message.author.username} щекочет ${username}`).setImage(`https://cdn.nekos.life/tickle/tickle_0${(rand+"").length==2 ? rand+"" : "0"+(rand+"")}.gif`).setFooter(con.footer));

    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["tickle"],
    desc: "Пощекотать",
    category: "Картинки",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<@user>** - Кого вы хотите пощекотать`)
        .addField('Примеры:',`**${con.prefix}tickle @Electroplayer** - Давайте пощекочем Electroplayer'а`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}