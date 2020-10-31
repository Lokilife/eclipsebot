const addlib = require("../addLib.js");
module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(args[0] == "help") {
            return message.channel.send(con.defEmb.setTitle("Помощь по команде clear").setDescription("Очистка сообщений").setFooter(con.footer)
            .addField('Аргументы:',`**<count>** - Удалит заданное количество сообщений`)
            .addField('Примеры:',`**${con.prefix}clear 10** - Удалит 10 сообщений`)
            .addField('Сокращения:',`**${con.prefix}clean**`)
            .addField('Могут использовать:','Люди с правом на управление сообщениями',true)
            .addField('Последнее обновление:',`Версия 1.0.0`,true)
            )
        }

        if(!message.member.permissions.has('MANAGE_MESSAGES')) return addlib.errors.notPerms(message);
        if(!message.guild.members.cache.get(bot.user.id).permissions.has('MANAGE_MESSAGES')) return addlib.errors.botNotPerms(message);
        if(!args[0]) return addlib.errors.notArgs(message, "Напиши аргумент **help** для помощи по команде");
        if(!/^[0-9]{1,}$/g.test(args[0]) || args[0] == "0") return addlib.errors.falseArgs(message, "Можно вводить только цифры, большие 0!");

        await message.delete();
        message.channel.bulkDelete(args[0],true).then(() => {
            addlib.errors.success(message,`Очищено ${args[0]} сообщений.`)
        });

        return;
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}clear`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["clear","clean"],
    desc: "Очистка сообщений",
    category: "Для модерации",
    show: true
}