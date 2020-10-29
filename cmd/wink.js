const r2          = require('r2');
const addlib      = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        let images = await r2.get(`https://some-random-api.ml/animu/wink`).json;
        message.channel.send(con.defEmb.setTitle(`${message.author.username} подмигивает`).setImage(images.link).setFooter(con.footer));
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}wink`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["wink"],
    desc: "Подмигнуть",
    category: "Картинки",
    show: true
}