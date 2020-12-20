const addlib = require('../addLib.js');
module.exports = {
    run: (bot,message,args,con)=> {try{
        if(args[0]) {
            let ok = false;
            for(let i=0;i<=con.cmds.length-1;i++) {
                for(let i2=0;i2<=con.cmds[i].cmd.length-1;i2++){
                    if(con.cmds[i].cmd[i2] == args[0]){
                        if(con.cmds[i].cmd[0] == "dog") message.channel.send(con.cmds[i].helpEmbed(con).setTitle(`Помощь по командам ${con.cmds[i].cmd}`).setDescription(con.cmds[i].desc).setFooter(con.footer))
                        else message.channel.send(con.cmds[i].helpEmbed(con).setTitle(`Помощь по команде ${con.cmds[i].cmd[0]}`).setDescription(con.cmds[i].desc).setFooter(con.footer))
                        ok = true;
                        break;
                    }
                }
                if(ok == true) break;
            }
            if(!ok) addlib.errors.falseArgs(message,"Такой команды/алиаса не существует!")
            return
        }

        let categories = con.categories;
        let emb = con.defEmb.setTitle('Помощь').setDescription('`e.help <команда>` для углублённой помощи по команде')
        let text =''
        for(let i1=0;i1<=categories.length-1;i1++) {
            text = ''
            for(let i2=0;i2<=con.cmds.length-1;i2++) {
                if(con.cmds[i2].category == categories[i1]) text = text+`**${con.prefix}${con.cmds[i2].cmd}** - ${con.cmds[i2].desc}\n`
            }
            if(text !== '') emb.addField(categories[i1],text);
        }
        message.channel.send(emb.setFooter(con.footer));
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}help`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["help","?","h"],
    desc: "Помощь",
    category: "Общее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<command || Нет>** - Показать более подробную информацию о команде`)
        .addField('Примеры:',`**${con.prefix}help** - Список всех команд\n**${con.prefix}help help** - Более подробная информация о help`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}