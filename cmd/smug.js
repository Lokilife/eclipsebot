const addlib  = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        let rand = Math.floor(Math.random()*19)+1;

        message.channel.send(con.defEmb.setTitle(`${message.author.username} доволен собой`).setImage(`https://cdn.nekos.life/smug/smug_0${(rand+"").length==2 ? rand+"" : "0"+(rand+"")}.gif`).setFooter(con.footer));
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["smug"],
    desc: "Улыбнуться",
    category: "Картинки",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}smug** - Улыбнись)`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}