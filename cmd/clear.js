const addlib = require("../addLib.js");
module.exports = {
    run: async (bot,message,args,con)=> {try{

        if(!message.member.permissions.has('MANAGE_MESSAGES')) return addlib.errors.notPerms(message);
        if(!message.guild.members.cache.get(bot.user.id).permissions.has('MANAGE_MESSAGES')) return addlib.errors.botNotPerms(message);
        if(!args[0]) return addlib.errors.notArgs(message, `Напиши **${con.prefix}help clear** для помощи по команде`);
        if(!/^[0-9]{1,}$/g.test(args[0]) || args[0] == "0") return addlib.errors.falseArgs(message, "Можно вводить только цифры, больше 0!");
        if(args[0]>1000) return addlib.errors.falseArgs(message, "Можно вводить только цифры, меньше 2000!");

        await message.delete();

        let count = args[0];

        for (let i; count;) {
            i = (count >= 100 ? 100 : count);
            count -= i;
            await message.channel.bulkDelete(i, true);
        }

        addlib.errors.success(message,`Очищено ${args[0]} сообщений.`)

        return;
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["clear","clean"],
    desc: "Очистка сообщений",
    category: "Для модерации",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<count>** - Удалит заданное количество сообщений`)
        .addField('Примеры:',`**${con.prefix}clear 10** - Удалит 10 сообщений`)
        .addField('Алиасы:',`**${con.prefix}clean**`)
        .addField('Могут использовать:','Люди с правом на управление сообщениями',true)
    },
    show: true
}