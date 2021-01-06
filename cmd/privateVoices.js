const addlib = require('../addLib.js');
const settings = require('../models/settings.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return addlib.errors.notArgs(message, `Напиши **${con.prefix}help welcome** для помощи по команде`)

        if(message.author.id !== message.guild.owner.id) return addlib.errors.notPerms(message)

        settings.findOne({serverID:message.guild.id},(err,set)=> {
            if(err) {
                addlib.errors.unknow(message,`Код ошибки: \`\`\`${err}\`\`\``);
                console.log(err);
            }

            if(!set) return addlib.errors.castom(message,"Обнови конфигурацию!",`${con.prefix}settings configurationupdate`);

            if(!args[0]) {
                return addlib.errors.notArgs(message, "<enabled \\|\\| channel \\|\\| category \\|\\| template \\|\\| position>")
            } else if(args[0] == "enabled") {
                if(!args[1]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.enabled))
                let ena = args[1].toLowerCase()
                if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")
                set.privatVoices = {
                    enabled: (ena == 'true'),
                    channel: set.privatVoices.channel,
                    category: set.privatVoices.category,
                    template: set.privatVoices.template,
                    position: set.privatVoices.position
                }
                addlib.errors.success(message, 'Конфигурация успешно изменена!')
            } else if(args[0] == "channel") {
                if(!args[1]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.privatVoices.channel || "Нет")))
                if(!message.guild.channels.cache.get(args[1])) return addlib.errors.noChannel(message)
                if(message.guild.channels.cache.get(args[1]).type != 'voice') return addlib.errors.falseArgs(message, `Канал не является голосовым.`) 
                set.privatVoices = {
                    enabled: set.privatVoices.enabled,
                    channel: args[1],
                    category: set.privatVoices.category,
                    template: set.privatVoices.template,
                    position: set.privatVoices.position
                }
                addlib.errors.success(message, 'Конфигурация успешно изменена!')
            } else if(args[0] == "category") {
                if(!args[1]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.privatVoices.category || "Нет")))
                if(!message.guild.channels.cache.get(args[1])) return addlib.errors.falseArgs(message)
                if(message.guild.channels.cache.get(args[1]).type != 'category') return addlib.errors.falseArgs(message, `Канал не является категорией!`) 
                
                set.privatVoices = {
                    enabled: set.privatVoices.enabled,
                    channel: set.privatVoices.channel,
                    category: args[1],
                    template: set.privatVoices.template,
                    position: set.privatVoices.position
                }
                addlib.errors.success(message, 'Конфигурация успешно изменена!')
                
            } else if(args[0] == "template") {
                if(!args[1]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.privatVoices.template || "Нет")))

                let template = args.slice(1).join(" ");
                if(!template) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.template))
                if(template.replace(`NAME`, `${message.author.tag}`) == template) return addlib.errors.falseArgs(message,"Не содержится переменная NAME!")
                if(template.length>=67) return addlib.errors.falseArgs(message,"Нельзя делать такой большой шаблон!")

                set.privatVoices = {
                    enabled: set.privatVoices.enabled,
                    channel: set.privatVoices.channel,
                    category: set.privatVoices.category,
                    template: template,
                    position: set.privatVoices.position
                }
                addlib.errors.success(message, 'Конфигурация успешно изменена!');
            } else if(args[0] == "position") {
                /*
                if(!args[1]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.privatVoices.template || "Нет")))

                let template = args.slice(1).join(" ");
                if(!template) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.template))
                if(template.replace(`NAME`, `${message.author.tag}`) == template) return addlib.errors.falseArgs(message,"Не содержится переменная NAME!")
                if(template.length>=67) return addlib.errors.falseArgs(message,"Нельзя делать такой большой шаблон!")

                set.privatVoices = {
                    enabled: set.privatVoices.enabled,
                    channel: set.privatVoices.channel,
                    category: set.privatVoices.category,
                    template: template,
                    position: set.privatVoices.position
                }
                addlib.errors.success(message, 'Конфигурация успешно изменена!');
                */
                
               addlib.errors.doNotWorksNow(message);
            } else {
                return addlib.errors.falseArgs(message, "<enabled \\|\\| channel \\|\\| category \\|\\| template>")
            }
            set.save().catch(err => console.log(err))
        })
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["privatevoices"],
    desc: "Настройка приватных каналов",
    category: "Настройки",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`*Всё начинается на \`${con.prefix}privatevoices\`*\n**enabled <true \\|\\| false>** - Включить/выключить приватные каналы\n**channel <ID>** - Обновить канал *(ВВОДИТЬ ТОЛЬКО ID!)*\n**category <ID>** - Обновить категорию *(ВВОДИТЬ ТОЛЬКО ID!)*\n**template <template>** - Обновить шаблон. Должен содержать в себе NAME (большим регистром), которое заменится на имя человека`)
        .addField('Могут использовать:','Создатель',true)
    },
    show: true
}