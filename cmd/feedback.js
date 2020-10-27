const addlib = require('../addLib.js');
module.exports = {
    run: async (bot,message,args,con)=> {try{
        const feedback = args.join(" ");
    
        if (!feedback)
          return message.channel.send(
            "Пожалуйста, укажите текст отзыва!"
          );
    
        if (!con.feedBackChannel || con.feedBackChannel === "") return;
    
        const embed = con.defEmb
          .setTitle(`Новый отзыв от ${message.author.tag}`)
          .setDescription(feedback)
          .setFooter(con.footer)
          .setTimestamp();
    
        bot.channels.cache.get(con.feedBackChannel).send(embed);
    
        addlib.errors.success(message,"Отзыв был успешно отправлен!");
      }catch(err){console.log(err)}},
    cmd: ["feedback"],
    desc: "Отправить отзыв",
    category: "Общее"
}