const r2          = require('r2');
const addlib      = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return addlib.errors.notArgs(message,"Упомяни того, кого хочешь погладить");
        if(!message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]))) return addlib.errors.noUser(message);
        let username = `${message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0])).user.username}`
        let images = await r2.get(`https://some-random-api.ml/animu/pat`).json;
        message.channel.send(con.defEmb.setTitle(`${message.author.username} гладит ${username}`).setImage(images.link).setFooter(con.footer));
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}pat`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["pat"],
    desc: "Погладить",
    category: "Картинки",
    show: true
}