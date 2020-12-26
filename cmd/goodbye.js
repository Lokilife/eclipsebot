const addlib    = require('../addLib.js');
const settings  = require('../models/settings.js');
const COLORS    = require('../colors.json');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return addlib.errors.notArgs(message, `Напиши **${con.prefix}help goodbye** для помощи по команде`)

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
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.goodbye.server.enabled))
                    let ena = args[2].toLowerCase()
                    if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: (ena == 'true'),
                            embed: set.goodbye.server.embed,
                            channel: set.goodbye.server.channel,
                            message: set.goodbye.server.message,
                            title: set.goodbye.server.title,
                            description: set.goodbye.server.description,
                            color: set.goodbye.server.color,
                            avatar: set.goodbye.server.avatar
                        }
                    }
                } else if(args[1] == "embed"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.goodbye.server.embed))
                    let ena = args[2].toLowerCase()
                    if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: set.goodbye.server.enabled,
                            embed: (ena == 'true'),
                            channel: set.goodbye.server.channel,
                            message: set.goodbye.server.message,
                            title: set.goodbye.server.title,
                            description: set.goodbye.server.description,
                            color: set.goodbye.server.color,
                            avatar: set.goodbye.server.avatar
                        }
                    }
                } else if(args[1] == "channel"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.goodbye.server.channel || "**Нет...**")))
                    if(!message.guild.channels.cache.get(args[2])) return addlib.errors.noChannel(message)
                    let chan = message.guild.channels.cache.get(args[2] || message.mentions.channels.first().id)
                    if(chan.type != 'text') return addlib.errors.falseArgs(message, `Канал не является текстовым.`)
                    if (!chan.permissionsFor(bot.user).has('SEND_MESSAGES')) return addlib.errors.botNotPerms(message)
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: set.goodbye.server.enabled,
                            embed: set.goodbye.server.embed,
                            channel: chan.id,
                            message: set.goodbye.server.message,
                            title: set.goodbye.server.title,
                            description: set.goodbye.server.description,
                            color: set.goodbye.server.color,
                            avatar: set.goodbye.server.avatar
                        }
                    }
                } else if(args[1] == "message"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение:').setDescription(set.goodbye.server.message || "**Нет...**"))
                    if(args.slice(2).join(' ').length>500) return addlib.errors.falseArgs(message, `Прощание не может быть больше 500 символов. Сори...`)
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: set.goodbye.server.enabled,
                            embed: set.goodbye.server.embed,
                            channel: set.goodbye.server.channel,
                            message: args.slice(2).join(' '),
                            title: set.goodbye.server.title,
                            description: set.goodbye.server.description,
                            color: set.goodbye.server.color,
                            avatar: set.goodbye.server.avatar
                        }
                    }
                } else if(args[1] == "title"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение:').setDescription(set.goodbye.server.title || "**Нет...**"))
                    
                    let title   = args.slice(2).join(' ')
                    let length  = title.replace("MEMBER", "").length != title.length ? title.length+26 : title.length
                    if(length>255) return addlib.errors.falseArgs(message, `Заголовок не может быть больше 255 символов. Сори...`)
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: set.goodbye.server.enabled,
                            embed: set.goodbye.server.embed,
                            channel: set.goodbye.server.channel,
                            message: set.goodbye.server.message,
                            title: title,
                            description: set.goodbye.server.description,
                            color: set.goodbye.server.color,
                            avatar: set.goodbye.server.avatar
                        }
                    }
                } else if(args[1] == "description"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение:').setDescription(set.goodbye.server.description || "**Нет...**"))
                    
                    let text   = args.slice(2).join(' ')
                    let length  = text.replace("MEMBER", "").length != text.length ? text.length+26 : text.length
                    if(length>600) return addlib.errors.falseArgs(message, `Описание не может быть больше 600 символов. Сори...`)
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: set.goodbye.server.enabled,
                            embed: set.goodbye.server.embed,
                            channel: set.goodbye.server.channel,
                            message: set.goodbye.server.message,
                            title: set.goodbye.server.title,
                            description: text,
                            color: set.goodbye.server.color,
                            avatar: set.goodbye.server.avatar
                        }
                    }
                } else if(args[1] == "color"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.goodbye.server.color || "**Нет...**")))
                    let c = args[2].toLowerCase()
                    if(!/[\da-f]{6}/.test(c) || c.length != 6) return addlib.errors.falseArgs(message,"Цвет нужно вводить в формате RRGGBB!")
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: set.goodbye.server.enabled,
                            embed: set.goodbye.server.embed,
                            channel: set.goodbye.server.channel,
                            message: set.goodbye.server.message,
                            title: set.goodbye.server.title,
                            description: set.goodbye.server.description,
                            color: c,
                            avatar: set.goodbye.server.avatar
                        }
                    }
                    set.save().catch(err => console.log(err))
                    return message.channel.send(con.defEmb.setColor(c).setTitle('Конфигурация успешно изменена!'))
                } else if(args[1] == "avatar"){
                    if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.goodbye.server.avatar))
                    let ena = args[2].toLowerCase()
                    if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                    set.goodbye = {
                        direct: set.goodbye.direct,
                        server: {
                            enabled: set.goodbye.server.enabled,
                            embed: set.goodbye.server.embed,
                            channel: set.goodbye.server.channel,
                            message: set.goodbye.server.message,
                            title: set.goodbye.server.title,
                            description: set.goodbye.server.description,
                            color: set.goodbye.server.color,
                            avatar: (ena == 'true')
                        }
                    }
                } else if(args[1] == "test") {
                    let msg
                    let member = message.member
                    
                    if(set.goodbye.server.embed == true) {
                        msg = con.defEmb.setColor(set.goodbye.server.color || COLORS.default)
                        .setTitle(set.goodbye.server.title.replace('MEMBER', member.user.username).replace('COUNT', member.guild.members.cache.size))
                        .setDescription(set.goodbye.server.description.replace('MEMBER', member.user.username).replace('COUNT', member.guild.members.cache.size))
                        
                        if(set.goodbye.server.avatar) msg.setThumbnail(member.user.avatarURL() || member.user.defaultAvatarURL);
                    } else {
                        msg = set.goodbye.server.message.replace('MEMBER', member.user.username).replace('COUNT', member.guild.members.cache.size);
                    }
            
                    return message.channel.send(msg);
                } else return addlib.errors.falseArgs(message, "<enabled \\|\\| embed \\|\\| channel \\|\\| message \\|\\| title \\|\\| description \\|\\| color \\|\\| avatar>")
                
                addlib.errors.success(message, 'Конфигурация успешно изменена!')
            } else {
                return addlib.errors.falseArgs(message, "<enabled \\|\\| channel \\|\\| category \\|\\| template>")
            }

            set.save().catch(err => console.log(err))

        })
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["goodbye"],
    desc: "Настройка прощаний",
    category: "Настройки",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`*Всё начинается на \`${con.prefix}goodbye server\`*\n**enabled <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть значение прощаний на сервере\n**embed <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть значение отправки embed-сообщения на сервере\n**channel <ID \\|\\| Ничего>** - Записать новый ID/посмотреть ID записанного канала для прощаний на сервере\n**message <message \\|\\| Ничего>** - Записать новое/посмотреть старое прощание на сервере. Может содержать такие переменные как: MEMBER и COUNT\n**title <title \\|\\| Ничего>** - Изменить/посмотреть заголовок embed-сообщения на сервере\n**description <description \\|\\| Ничего>** - Изменить/посмотреть описание embed-сообщения на сервере\n**avatar <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть текущее значение отправки аватара в embed-сообщении на сервере\n**color <color \\|\\| Ничего>** - Изменить/посмотреть цвет embed-сообщения на сервере\n**test** - Посмотреть получаемое прощание`)
        .addField('Могут использовать:','Создатель',true)
    },
    show: true
}