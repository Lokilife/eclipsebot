const addlib = require('../addLib.js'); //  Моя либа)
module.exports = {
    run: async (bot,message,args,con)=> {try{
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) { // Если у бота нет права банить
      return message.channel.send("У вас нет права банить участников, следовательно, вы столкнулись с этой ошибкой.");
    }

    const banUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let banReason = args.join(" ").slice(23);

    if (!banUser) return message.channel.send("Пожалуйста, укажите пользователя!"); // Если не указан пользователь
    if (!banReason) banReason = "Причина не указана"; // Если не указана причина бана

    if (!message.member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR")) // Если у участника нет права банить кого-либо
      return message.channel.send("У вас нет права банить участников, следовательно, вы столкнулись с этой ошибкой.");

    if (!banUser.bannable || banUser.hasPermission("BAN_MEMBERS")) { // Если у пользователя, которого надо забанить, больше прав
      return message.channel.send("Этот пользователь не может быть забанен, так как у него больше прав, чем у вас.");
    }

    if (message.guild.roles.highest.comparePositionTo(banUser.roles.highest) < 0) { // Если боту недостаточно прав
      return message.channel.send(`Этот пользователь не может быть забанен, так как у него больше прав, чем у меня.`);
    }

    banUser.ban({ reason: banReason }); // Сам процесс бана
    banUser.user.send(`Вы были забанены на сервере **${message.guild.name}** по причине:\n${banReason}`); // Уведомление в ЛС забаненному пользователю
    message.channel.send(`Пользователь ${banUser} был успешно забанен.\nЯ также отправил личное сообщение, сообщив об этом пользователю.`); // Еще какое-то уведомление (я просто хз как это описать)
  },
};
    catch(err){ //  Если возник ушиб очка, то это отправит всё в консоль и в канал
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}ban`) //  Сюда пишешь название команды
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["ban"], //  Сюда все е алиасы. Первый желательно главный
    desc: "Выгоняет пользователя с сервера и блокирует его", //  Описание
    category: "Для модерации", //  Категория
    show: true  //  true - Показывать в команде help | false - не показывать
}
