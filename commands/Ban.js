const config  = require('../config.json');
const errors  = require('../lib/errors.js');

module.exports = {
    "run": async (message, bot, args) => {

        if (!args[0]) return errors.notArgs(message, `Напиши **${config.prefix}help ban** для помощи по команде`) //  Если пользователь не указан

        let banUser    = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]));
        let banReason  = args.slice(1).join(" ") || "";

        if (!banUser) return errors.noUser(message); // Если указан не существующий пользователь
        if (message.guild.me.roles.highest.comparePositionTo(banUser.roles.highest) < 0 || !banUser.bannable) return errors.custom(message, "Я не могу забанить этого человека");
        if (`${banReason}\n\nЗабанен с помощью Eclipse пользователем ${message.author.tag}`.length>=512) return errors.falseArgs(message,"Слишком большая причина")

        let mesg = `Вы были забанены на сервере **${message.guild.name}**`

        if(!banReason) banReason = "";
        else {
            mesg = mesg +  `по причине:\n${banReason}`;
            banReason = banReason + "\n\n";
        }

        banUser.user.send(mesg); // Уведомление в ЛС забаненному пользователю
        banUser.ban({reason:`${banReason} Забанен с помощью Eclipse пользователем ${message.author.tag}`}); // Сам процесс кика
        errors.success(message,`Пользователь ${banUser.user.username} был успешно забанен.`)    },
    "aliases": ["ban"],
    "help": {
        "category": "Модерация",
        "description": "Заблокировать пользователя на сервере",
        "arguments": `**<user> <reason || Нет>** - Забанить человека по указанной причине *(Можно ввести ID или имя)*`,
        "usage": `**${config.prefix}ban @Electroplayer Спамер** - Забанит Электроплэера по причине "Спамер"\n**${config.prefix}ban @Electroplayer** - Молча баним Electroplayer`,
    },
    "botPermissions": ["BAN_MEMBERS"],
    "userPermissions": ["BAN_MEMBERS"]
}
