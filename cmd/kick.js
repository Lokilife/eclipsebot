const addlib = require('../addLib.js'); //  Моя либа)
module.exports = {
    run: async (bot,message,args,con)=> {try{
        if (!args[0]) return addlib.errors.notArgs(message) //  Если пользователь не указан

        let kickUser    = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]));
        let kickReason  = args.slice(1).join(" ") || "";

        // Если у бота нет права кикать кого-либо
        if (!kickUser) return addlib.errors.noUser(message); // Если указан не существующий пользователь
        if (message.guild.me.roles.highest.comparePositionTo(kickUser.roles.highest) < 0 || !kickUser.kickable || !message.guild.me.hasPermission("KICK_MEMBERS")) return addlib.errors.botNotPerms(message);
        if (!message.member.hasPermission("KICK_MEMBERS")) return addlib.errors.notPerms(message)
        if (`${kickReason}\n\nИзгнан с помощью Eclipse пользователем ${message.author.tag}`.length>=512) return addlib.errors.falseArgs(message,"Слишком большая причина")

        let mesg = `Вы были изгнаны с сервера **${message.guild.name}**`

        if(!kickReason) kickReason = "";
        else {
            kickReason = kickReason + "\n\n";
            mesg = mesg +  `по причине:\n${kickReason}`
        }

        kickUser.user.send(mesg); // Уведомление в ЛС кикнутому пользователю
        kickUser.kick({reason:`${kickReason}Изгнан с помощью Eclipse пользователем ${message.author.tag}`}); // Сам процесс кика
        addlib.errors.success(message,`Пользователь ${kickUser.user.username} был успешно изгнан.`)
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}kick`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["kick"],
    desc: "Выгоняет пользователя с сервера",
    category: "Для модерации",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<user> <reason || ничего>** - Кикнуть человека по указанной причине *(Можно ввести ID или имя)*`)
        .addField('Примеры:',`**${con.prefix}kick @Electroplayer Спамит** - Кикнет Электроплэера по причине "Спамит"\n**${con.prefix}kick @Electroplayer** - Молча кикнем Electroplayer'а`)
        .addField('Могут использовать:','Люди с правом на кик',true)
    },
    show: true
}
