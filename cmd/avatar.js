const addlib = require("../addLib.js");

module.exports = {
    run: (bot,message,args,con)=> {try{
        if(!args[0]) {
            return message.channel.send(con.defEmb.setTitle(`Вот твой аватар:`).setDescription(`[Если не загрузилось](${message.author.avatarURL({ dynamic: true, size: 4096 }) || message.author.defaultAvatarURL})`).setImage(message.author.avatarURL({ dynamic: true, size: 4096 }) || message.author.defaultAvatarURL).setFooter(con.footer));
        } else if(args[0] == "server") {
            if(!message.guild.iconURL({ dynamic: true, size: 512 })) return addlib.errors.castom(message,`Сервер не имеет аватарки!`);
            return message.channel.send(con.defEmb.setTitle(`Аватарка сервера`).setDescription(`[Если не загрузилось](${message.guild.iconURL({ dynamic: true, size: 4096 })})`).setImage(message.guild.iconURL({ dynamic: true, size: 4096 })).setFooter(con.footer));
        } else {
            let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]));
            if(!aUser) return addlib.errors.noUser(message);
            return message.channel.send(con.defEmb.setTitle(`Аватар пользователя ${aUser.user.username}:`).setDescription(`[Если не загрузилось](${aUser.user.avatarURL({ dynamic: true, size: 4096 }) || aUser.user.defaultAvatarURL})`).setImage(aUser.user.avatarURL({ dynamic: true, size: 4096 }) || aUser.user.defaultAvatarURL).setFooter(con.footer));
        } 
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["avatar","ava"],
    desc: "Показать аватар",
    category: "Прочее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<user || автор>** - Покажет аватар упомянутого пользователя *(Можно ввести ID или имя)*`)
        .addField('Примеры:',`**${con.prefix}avatar** - Покажет твой аватар\n**${con.prefix}avatar @user** - Покажет аватар упомянутого пользователя\n**${con.prefix}avatar 111111123456789101** - Покажет аватар пользователя с таким ID\n**${con.prefix}avatar UserName** - Покажет аватар пользователя с таким именем *(НЕ НИКОМ НА СЕРВЕРЕ)*\n**${con.prefix}avatar server** - Покажет аватар сервера`)
        .addField('Алиасы:',`**${con.prefix}ava**`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}