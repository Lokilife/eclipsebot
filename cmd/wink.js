const fetch   = require('node-fetch');
const addlib  = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        fetch(`https://some-random-api.ml/animu/wink`).then(res => res.json().catch(()=> addlib.errors.APIErrors(message))).then(json => {
            message.channel.send(con.defEmb.setTitle(`${message.author.username} подмигивает`).setImage(json.link).setFooter(con.footer));
        });
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
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}wink** - Подмигни)`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}