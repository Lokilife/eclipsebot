const addlib      = require('../addLib.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        message.delete();
        
        let text = args.join(" ");

        if(!text.trim()) return message.channel.send(con.defEmb.setTitle('?')).then(async msg=> {
            await msg.react('✅');
            msg.react('❎');
        })

        let matchedText = text.match(/"(\\.|[^"\\])*"/g)

        if(!matchedText) {
            if(text.length>=256) return addlib.errors.falseArgs(message,"Тема не может быть длиннее 256 символов!")
            message.channel.send(con.defEmb.setTitle(text)).then(async msg=> {
                await msg.react('✅');
                msg.react('❎');
            })
            return;
        }

        let topic    = matchedText[0].slice(1).slice(0,-1);
        let variables = matchedText.slice(1)

        if(topic && variables) {

            let endText = "";
            let l = 0;
            let i = 0;
            for(;i<=variables.length-1;i++) {
                if(variables[i].slice(1).slice(0,-1).trim() == "") {
                    l++;
                    continue;
                }
                endText+= `${i+1-l}. ${variables[i].slice(1).slice(0,-1)}\n`
            }
            if((i-l)>10) return addlib.errors.falseArgs(message,"Не больше 10 вариантов!");
            if(topic.length>=256) return addlib.errors.falseArgs(message,"Тема должна быть не больше 256 символов!");

            if(endText == "") return message.channel.send(con.defEmb.setTitle(text)).then(async msg=> {
                await msg.react('✅');
                msg.react('❎');
            });
            
            message.channel.send(con.defEmb.setTitle(topic).setDescription(endText)).then(async msg=> {
                for(let i2 = 1;i2<(i+1-l);i2++){
                    await msg.react(["1️⃣", "2️⃣", "3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"][i2-1]);
                }
            });
        } else if(!topic && variables) {
            let endText = "";
            let l = 0;
            let i = 0;
            for(;i<=variables.length-1;i++) {
                if(variables[i].slice(1).slice(0,-1).trim() == "") {
                    l++;
                    continue;
                }
                endText+= `${i+1-l}. ${variables[i].slice(1).slice(0,-1)}\n`
            }
            if((i-l)>10) return addlib.errors.falseArgs(message,"Не больше 10 вариантов!");

            if(endText == "") return message.channel.send(con.defEmb.setTitle('?')).then(async msg=> {
                await msg.react('✅');
                msg.react('❎');
            });
            
            message.channel.send(con.defEmb.setDescription(endText)).then(async msg=> {
                for(let i2 = 1;i2<(i+1-l);i2++){
                    await msg.react(["1️⃣", "2️⃣", "3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"][i2-1]);
                }
            });
        } else if(topic && !variables) {
            let endText
            if(topic.trim() == "") endText = "?"
            else endText = topic
            return message.channel.send(con.defEmb.setTitle(endText)).then(async msg=> {
                await msg.react('✅');
                msg.react('❎');
            });
        } else return message.channel.send(con.defEmb.setTitle('?')).then(async msg=> {
            await msg.react('✅');
            msg.react('❎');
        });

    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["poll"],
    desc: "Создание голосований",
    category: "Прочее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**<тема голосования || "?">** - Создаст голосование с выбранной темой\n**"<тема голосования || "?">" "<выбор 1>" "<выбор 2>" ... "<выбор 10>"** - Создаст голосование между заданными элементами`)
        .addField('Примеры:',`**${con.prefix}poll** - Создаст голосование с темой "?"\n**${con.prefix}poll Пойти кушать?** -  Создаст голосование с темой "Пойти кушать?"\n**${con.prefix}poll "Что покушать?" "Яичница" "Омлет" "Омлет с сосисками"** - Создаст голосование с темой "Что покушать?" и элементами "Яичница", "Омлет", "Омлет с сосисками"\n**${con.prefix}poll "" "Да" "Нет" "Не знаю"** - Создаст голосование без темы с элементами "Да" "Нет" и "Не знаю"`)
        .addField('Могут использовать:','Все без исключений',true)
    },
	show: true
}