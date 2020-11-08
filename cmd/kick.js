const addlib = require('../addLib.js'); //  Моя либа)
module.exports = {
    run: async (bot,message,args,con)=> {try{
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) // Если у бота нет права кикать кого-либо
      return message.channel.send("У меня нет права выгонять участников, следовательно, вы столкнулись с этой ошибкой.");

    const kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    let kickReason = args.join(" ").slice(23);

    if (!kickUser) {
      return message.channel.send("Пожалуйста, укажите пользователя!"); // Если не указан пользователь
    }

    if (!kickReason) kickReason = "Причина не указана"; // Если указанная причина кика пуста

    if (!message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR")) // Если у пользователя нет права выгонять участников
      return message.channel.send("У вас нет права выгонять участников, следовательно, вы столкнулись с этой ошибкой.");

    if (!kickUser.kickable || kickUser.hasPermission("KICK_MEMBERS")) { // Если у выгоняемого пользователя больше прав, чем у пользователя, который хочет его выгнать
      return message.channel.send("Этот пользователь не может быть изгнан, так как у него больше прав, чем у вас.");
    }

    if (message.guild.me.roles.highest.comparePositionTo(kickUser.roles.highest) < 0) { // Если у выгоняемого пользователя больше прав, чем у бота
      return message.channel.send(`Этот пользователь не может быть забанен, так как у него больше прав, чем у меня.`);
    }

    kickUser.kick(kickReason); // Сам процесс кика
    kickUser.user.send(`Вы были изгнаны с сервера **${message.guild.name}** по причине:\n${kickReason}`); // Уведомление в ЛС кикнутому пользователю
    message.channel.send(`Пользователь ${kickUser} был успешно изгнан.\nЯ также отправил личное сообщение, сообщив об этом пользователю.`); // Уведомление об успешном кике
  },
};
    catch(err){ //  Если возник ушиб очка, то это отправит всё в консоль и в канал
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}kick`) //  Сюда пишешь название команды
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["kick"], //  Сюда все е алиасы. Первый желательно главный
    desc: "Выгоняет пользователя с сервера", //  Описание
    category: "Для модерации", //  Категория
    show: true  //  true - Показывать в команде help | false - не показывать
}
