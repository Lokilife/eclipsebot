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
                return addlib.errors.notArgs(message, "<direct \\|\\| server \\|\\| autorole>")
            } else if(args[0] == "direct") {
                addlib.errors.doNotWorksNow(message);
            } else if(args[0] == "server") {
                if(!args[1]) return addlib.errors.notArgs(message, "<enabled \\|\\| embed \\|\\| channel \\|\\| message \\|\\| title \\|\\| description \\|\\| color \\|\\| avatar>");
                else if(args[1]   == "enabled"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.wellcome.server.enabled))
                    let ena = args[2].toLowerCase()
                    if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: (ena == 'true'),
                            embed: set.wellcome.server.embed,
                            channel: set.wellcome.server.channel,
                            message: set.wellcome.server.message,
                            title: set.wellcome.server.title,
                            description: set.wellcome.server.description,
                            color: set.wellcome.server.color,
                            avatar: set.wellcome.server.avatar
                        },
                        autorole: set.wellcome.autorole
                    }
                } else if(args[1] == "embed"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.wellcome.server.embed))
                    let ena = args[2].toLowerCase()
                    if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: set.wellcome.server.enabled,
                            embed: (ena == 'true'),
                            channel: set.wellcome.server.channel,
                            message: set.wellcome.server.message,
                            title: set.wellcome.server.title,
                            description: set.wellcome.server.description,
                            color: set.wellcome.server.color,
                            avatar: set.wellcome.server.avatar
                        },
                        autorole: set.wellcome.autorole
                    }
                } else if(args[1] == "channel"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.wellcome.server.channel || "**Нет...**")))
                    if(!message.guild.channels.cache.get(args[2])) return addlib.errors.noChannel(message)
                    let chan = message.guild.channels.cache.get(args[2] || message.mentions.channels.first().id)
                    if(chan.type != 'text') return addlib.errors.falseArgs(message, `Канал не является текстовым.`)
                    if (!chan.permissionsFor(bot.user).has('SEND_MESSAGES')) return addlib.errors.botNotPerms(message)
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: set.wellcome.server.enabled,
                            embed: set.wellcome.server.embed,
                            channel: chan.id,
                            message: set.wellcome.server.message,
                            title: set.wellcome.server.title,
                            description: set.wellcome.server.description,
                            color: set.wellcome.server.color,
                            avatar: set.wellcome.server.avatar
                        },
                        autorole: set.wellcome.autorole
                    }
                } else if(args[1] == "message"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение:').setDescription(set.wellcome.server.message || "**Нет...**"))
                    if(args.slice(2).join(' ').length>500) return addlib.errors.falseArgs(message, `Приветствие не может быть больше 500 символов. Сори...`)
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: set.wellcome.server.enabled,
                            embed: set.wellcome.server.embed,
                            channel: set.wellcome.server.channel,
                            message: args.slice(2).join(' '),
                            title: set.wellcome.server.title,
                            description: set.wellcome.server.description,
                            color: set.wellcome.server.color,
                            avatar: set.wellcome.server.avatar
                        },
                        autorole: set.wellcome.autorole
                    }
                } else if(args[1] == "title"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение:').setDescription(set.wellcome.server.title || "**Нет...**"))
                    
                    let title   = args.slice(2).join(' ')
                    let length  = title.replace("MEMBER", "").length != title.length ? title.length+26 : title.length
                    if(length>255) return addlib.errors.falseArgs(message, `Заголовок не может быть больше 255 символов. Сори...`)
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: set.wellcome.server.enabled,
                            embed: set.wellcome.server.embed,
                            channel: set.wellcome.server.channel,
                            message: set.wellcome.server.message,
                            title: title,
                            description: set.wellcome.server.description,
                            color: set.wellcome.server.color,
                            avatar: set.wellcome.server.avatar
                        },
                        autorole: set.wellcome.autorole
                    }
                } else if(args[1] == "description"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение:').setDescription(set.wellcome.server.description || "**Нет...**"))
                    
                    let text   = args.slice(2).join(' ')
                    let length  = text.replace("MEMBER", "").length != text.length ? text.length+26 : text.length
                    if(length>600) return addlib.errors.falseArgs(message, `Описание не может быть больше 600 символов. Сори...`)
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: set.wellcome.server.enabled,
                            embed: set.wellcome.server.embed,
                            channel: set.wellcome.server.channel,
                            message: set.wellcome.server.message,
                            title: set.wellcome.server.title,
                            description: text,
                            color: set.wellcome.server.color,
                            avatar: set.wellcome.server.avatar
                        },
                        autorole: set.wellcome.autorole
                    }
                } else if(args[1] == "color"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.wellcome.server.color || "**Нет...**")))
                    let c = args[2].toLowerCase()
                    if(!/[\da-f]{6}/.test(c) || c.length != 6) return addlib.errors.falseArgs(message,"Цвет нужно вводить в формате RRGGBB!")
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: set.wellcome.server.enabled,
                            embed: set.wellcome.server.embed,
                            channel: set.wellcome.server.channel,
                            message: set.wellcome.server.message,
                            title: set.wellcome.server.title,
                            description: set.wellcome.server.description,
                            color: c,
                            avatar: set.wellcome.server.avatar
                        },
                        autorole: set.wellcome.autorole
                    }
                } else if(args[1] == "avatar"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.wellcome.server.avatar))
                    let ena = args[2].toLowerCase()
                    if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                    set.wellcome = {
                        direct: set.wellcome.direct,
                        server: {
                            enabled: set.wellcome.server.enabled,
                            embed: set.wellcome.server.embed,
                            channel: set.wellcome.server.channel,
                            message: set.wellcome.server.message,
                            title: set.wellcome.server.title,
                            description: set.wellcome.server.description,
                            color: set.wellcome.server.color,
                            avatar: (ena == 'true')
                        },
                        autorole: set.wellcome.autorole
                    }
                } else return addlib.errors.falseArgs(message, "<enabled \\|\\| embed \\|\\| channel \\|\\| message \\|\\| title \\|\\| description \\|\\| color \\|\\| avatar>")
                
                addlib.errors.success(message, 'Конфигурация успешно изменена!')
            } else if(args[0] == "autorole") {
                addlib.errors.doNotWorksNow(message);
            } else {
                return addlib.errors.falseArgs(message, "<enabled \\|\\| channel \\|\\| category \\|\\| template>")
            }

            set.save().catch(err => console.log(err))

        })
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}settings`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["welcome"],
    desc: "Настройка сервера",
    category: "Настройки",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`*Всё начинается на \`${con.prefix}welcome server\`*\n**enabled <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть значение приветствий на сервере\n**embed <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть значение отправку(и) embed-сообщения на сервере\n**channel <ID \\|\\| Ничего>** - Записать новый ID/посмотреть ID записанного канала для приветствий на сервере\n**message <message \\|\\| Ничего>** - Записать новое/посмотреть старое приветствие на сервере. Может содержать такие переменные как: MEMBER и COUNT\n**title <title \\|\\| Ничего>** - Изменить/посмотреть заголовок embed-сообщения на сервере\n**description <description \\|\\| Ничего>** - Изменить/посмотреть описание embed-сообщения на сервере\n**avatar <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть текущее значение отправки аватара в embed-сообщении на сервере\n**color <color \\|\\| Ничего>** - Изменить/посмотреть цвет embed-сообщения на сервере`)
        .addField('Могут использовать:','Создатель',true)
    },
    show: true
}