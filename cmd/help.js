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

        let numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
        
        let fields = {
            "1️⃣": {
                "name": "Содержание",
                "value": ""
            }
        }

        let titVal = "1. Содержание\n";

        for(let i = 0;i<=categories.length-1;i++) {
            titVal = titVal + `${i+2}. ${categories[i]}\n`;
        }

        fields['1️⃣'].value = titVal

        let text = '';
        let i1   = 0;
        for(;i1<=categories.length-1;i1++) {
            text = ''

            for(let i2=0;i2<=con.cmds.length-1;i2++) {
                if(con.cmds[i2].category == categories[i1]) text = text+`**${con.prefix}${con.cmds[i2].cmd}** - ${con.cmds[i2].desc}\n`
            }
            
            if(text == '') text = "Тут пока ничего нет...";

            fields[numbers[i1+1]] = {
                "name": categories[i1],
                "value": text
            }
        }

        message.channel.send(emb.addField(fields['1️⃣'].name,fields['1️⃣'].value).setFooter(con.footer)).then(async msg=> {
            for(let i=0;i<=i1;i++){
                await msg.react(numbers[i]);
            }

            numbers = numbers.slice(0,i1+1)

            let filter = (reaction,user) => numbers.includes(reaction.emoji.name) && user.id === message.author.id
            let collector  = msg.createReactionCollector(filter,{idle:30000});

            collector.on('collect',(r) => {
                msg.reactions.cache.get(r.emoji.name).users.remove(message.client.users.cache.get(message.author.id));

                emb.fields = [fields[r.emoji.name]];

                msg.edit(emb)
            });
            
            collector.on('end', async () => {
                try {
                    await msg.reactions.removeAll()
                } catch (error) {console.log(error)}
            })
        })
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
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