const addlib = require('../addLib.js'); //  Моя либа)
module.exports = {
    run: async (bot,message,args,con)=> {try{
        if (!args[0]) return addlib.errors.notArgs(message, `Напиши **${con.prefix}help ban** для помощи по команде`) //  Если пользователь не указан

        let banUser    = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]));
        let banReason  = args.slice(1).join(" ") || "";

        // Если у бота нет права банить кого-либо
        if (!banUser) return addlib.errors.noUser(message); // Если указан не существующий пользователь
        if (message.guild.me.roles.highest.comparePositionTo(banUser.roles.highest) < 0 || !banUser.bannable || !message.guild.me.hasPermission("BAN_MEMBERS")) return addlib.errors.botNotPerms(message);
        if (!message.member.hasPermission("BAN_MEMBERS")) return addlib.errors.notPerms(message)
        if (`${banReason}\n\nЗабанен с помощью Eclipse пользователем ${message.author.tag}`.length>=512) return addlib.errors.falseArgs(message,"Слишком большая причина")

        let mesg = `Вы были забанены на сервере **${message.guild.name}**`

        if(!banReason) banReason = "";
        else {
            banReason = banReason + "\n\n";
            mesg = mesg +  `по причине:\n${banReason}`
        }

        banUser.user.send(mesg); // Уведомление в ЛС забаненному пользователю
        banUser.ban({reason:`${banReason}Забанен с помощью Eclipse пользователем ${message.author.tag}`}); // Сам процесс кика
        addlib.errors.success(message,`Пользователь ${banUser.user.username} был успешно забанен.`)
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}ban`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["ban"],
    desc: "Выгоняет пользователя с сервера и блокирует его",
    category: "Для модерации",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<user> <reason || ничего>** - Забанить человека по указанной причине *(Можно ввести ID или имя)*`)
        .addField('Примеры:',`**${con.prefix}ban @Electroplayer Спамит** - Забанит Электроплэера по причине "Спамит"\n**${con.prefix}ban @Electroplayer** - Молча баним Electroplayer`)
        .addField('Могут использовать:','Люди с правом на бан',true)
    },
    show: true
}
