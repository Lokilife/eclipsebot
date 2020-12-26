const fetch   = require('node-fetch');
const addlib  = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        fetch(`https://some-random-api.ml/animu/wink`).then(res => res.json().catch(()=> addlib.errors.APIErrors(message))).then(json => {
            message.channel.send(con.defEmb.setTitle(`${message.author.username} подмигивает`).setImage(json.link).setFooter(con.footer));
        });
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
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