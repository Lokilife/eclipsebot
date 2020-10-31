const r2          = require('r2');
const addlib      = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        let images = await r2.get(`https://some-random-api.ml/img/fox`).json;
        message.channel.send(con.defEmb.setTitle("Лисичка:").setImage(images.link).setFooter(con.footer));
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}fox`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["fox"],
    desc: "Рандомная картинка лисы",
    category: "Картинки",
    show: true
}