const fetch   = require('node-fetch');
const addlib  = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        fetch(`https://some-random-api.ml/img/${con.cmd.slice(con.prefix.length)}`).then(res => res.json()).then(json => {
            message.channel.send(con.defEmb.setTitle("Воть:").setImage(json.link).setFooter(con.footer));
        });
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}pictures`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["dog","cat","fox","bird","panda","whale"],
    desc: "Рандомные картинки животных",
    category: "Картинки",
    show: true
}