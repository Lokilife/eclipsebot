const addlib = require('../addLib.js');
module.exports = {
    run: async (bot,message,args,con)=> {try{
        const feedback = args.join(" ");
    
        if (!feedback) return message.channel.send("Пожалуйста, укажите текст отзыва!");
    
        if (!con.feedBackChannel || con.feedBackChannel === "") return;
    
        const embed = con.defEmb
        .setTitle(`Новый отзыв от ${message.author.tag}`)
        .setDescription(feedback)
        .setFooter(con.footer)
        .setTimestamp();
    
        bot.channels.cache.get(con.feedBackChannel).send(embed);
    
        addlib.errors.success(message,"Отзыв был успешно отправлен!");
      }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}feedback`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["feedback"],
    desc: "Отправить отзыв",
    category: "Общее"
}