const r2          = require('r2');
const addlib      = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        let images = await r2.get(`https://some-random-api.ml/img/birb`).json;
        message.channel.send(con.defEmb.setTitle("Рандом птица:").setImage(images.link).setFooter(con.footer));
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}birb`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["bird"],
    desc: "Рандомная картинка птицы",
    category: "Картинки",
    show: true
}