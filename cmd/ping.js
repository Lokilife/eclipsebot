const addlib = require('../addLib.js');
module.exports = {
    run: async (bot,message,args,con)=> {try{
        /*
        let resEmbed = con.defEmb
        .setTitle("Понг!")
        .addField(`Пинг:`, `${Math.round(bot.ws.ping)} ms`)
        .setFooter(con.footer)
        message.channel.send(resEmbed);
        */
        const msg = await message.channel.send(con.defEmb.setTitle(`🏓 Проверка...`));

        msg.edit(con.defEmb.setTitle(`🏓 Понг!`).addField(`Задержка:`, `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`).addField(`Задержка API:`, ` ${Math.round(bot.ws.ping)}ms`).setFooter(con.footer));
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["ping"],
    desc: "Пинг",
    category: "Общее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}ping** - Показать скорость соединения от хоста до серверов Discord`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}