const addlib = require('../addLib.js'); //  Моя либа)
module.exports = {
    run: async (bot,message,args,con)=> {try{
        //  Сюда пишешь свой код, желательно с комментариями, но можно и без них)
    }catch(err){ //  Если возник ушиб очка, то это отправит всё в консоль и в канал
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}template`) //  Сюда пишешь название команды
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["template"], //  Сюда все е алиасы. Первый желательно главный
    desc: "Шаблон", //  Описание
    category: "Общее", //  Категория
    show: false  //  true - Показывать в команде help | false - не показывать
}