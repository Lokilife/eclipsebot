/* eslint-disable no-case-declarations */
const addlib = require('../addLib.js');
const settings = require('../models/settings.js');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return addlib.errors.notArgs(message, `Напиши **${con.prefix}help settings** для помощи по команде`)

        if(message.author.id !== message.guild.owner.id) return addlib.errors.notPerms(message)

        settings.findOne({serverID:message.guild.id},(err,set)=> {
            if(err) {
                addlib.errors.unknow(message,`Код ошибки: \`\`\`${err}\`\`\``);
                console.log(err);
            }

            switch (args[0].toLowerCase()) {
                case "configurationupdate":
                    if(!set) {
                        var newSet = new settings({
                            serverID: message.guild.id,
                            wellcome: {
                                direct: {
                                    enabled: false,
                                    message: "MEMBER, добро пожаловать на **SERVER**!",
                                    embed: {
                                        enabled: false,
                                        color: "",
                                        avatar: false
                                    }
                                },
                                server: {
                                    enabled: false,
                                    channel: "", 
                                    message: "MEMBER, добро пожаловать на **SERVER**! Ты уже **COUNT**!",
                                    embed: {
                                        enabled: false,
                                        color: "",
                                        avatar: true
                                    }
                                },
                                autorole: {
                                    enabled: false,
                                    role: ""
                                }
                            },
                            goodbye: {
                                direct: {
                                    enabled: false,
                                    message: "MEMBER, ты ушёл с **SERVER**!",
                                    embed: {
                                        enabled: false,
                                        color: "",
                                        avatar: false
                                    }
                                },
                                server: {
                                    enabled: false,
                                    channel: "", 
                                    message: "MEMBER, ушёл **SERVER**! Нас осталось **COUNT**!",
                                    embed: {
                                        enabled: false,
                                        color: "",
                                        avatar: true
                                    }
                                }
                            },
                            privatVoices: {
                                enabled: false,
                                channel: "",
                                category: "",
                                template: "<+> NAME"
                            },
                            other: {
                                logChannel:"",
                                adminRole:""
                            }
                        })

                        newSet.save().catch(err => console.log(err))
                    } else {
                        set.wellcome = {
                            direct: {
                                enabled: false,
                                message: "MEMBER, добро пожаловать на **SERVER**!",
                                embed: {
                                    enabled: false,
                                    color: "",
                                    avatar: false
                                }
                            },
                            server: {
                                enabled: false,
                                channel: "", 
                                message: "MEMBER, добро пожаловать на **SERVER**! Ты уже **COUNT**!",
                                embed: {
                                    enabled: false,
                                    color: "",
                                    avatar: true
                                }
                            },
                            autorole: {
                                enabled: false,
                                role: ""
                            }
                        }

                        set.goodbye = {
                            direct: {
                                enabled: false,
                                message: "MEMBER, ты ушёл с **SERVER**!",
                                embed: {
                                    enabled: false,
                                    color: "",
                                    avatar: false
                                }
                            },
                            server: {
                                enabled: false,
                                channel: "", 
                                message: "MEMBER, ушёл **SERVER**! Нас осталось **COUNT**!",
                                embed: {
                                    enabled: false,
                                    color: "",
                                    avatar: true
                                }
                            }
                        }

                        set.privatVoices = {
                            enabled: false,
                            channel: "",
                            category: "",
                            template: "<+> NAME"
                        }

                        set.other = {
                            logChannel:"",
                            adminRole:""
                        }

                        set.save().catch(err => console.log(err))
                    }

                    addlib.errors.success(message,"Конфигурация успешно обновлена!");
                    
                break;

                case "privatevoices":
                    if(!set) return addlib.errors.castom(message,"Обнови конфигурацию!",`${con.prefix}settings configurationupdate`);

                    if(!args[1]) {
                        return addlib.errors.notArgs(message, "<enabled \\|\\| channel \\|\\| category \\|\\| template>")
                    } else if(args[1] == "enabled") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.enabled))
                        let ena = args[2].toLowerCase()
                        if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")
                        set.privatVoices = {
                            enabled: (ena == 'true'),
                            channel: set.privatVoices.channel,
                            category: set.privatVoices.category,
                            template: set.privatVoices.template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                    } else if(args[1] == "channel") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.channel))
                        if(!message.guild.channels.cache.get(args[2])) return addlib.errors.noChannel(message)
                        if(message.guild.channels.cache.get(args[2]).type != 'voice') return addlib.errors.falseArgs(message, `Канал не является голосовым.`) 
                        set.privatVoices = {
                            enabled: set.privatVoices.enabled,
                            channel: args[2],
                            category: set.privatVoices.category,
                            template: set.privatVoices.template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                    } else if(args[1] == "category") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.category))
                        if(!message.guild.channels.cache.get(args[2])) return addlib.errors.falseArgs(message)
                        if(message.guild.channels.cache.get(args[2]).type != 'category') return addlib.errors.falseArgs(message, `Канал не является категорией!`) 
                        
                        set.privatVoices = {
                            enabled: set.privatVoices.enabled,
                            channel: set.privatVoices.channel,
                            category: args[2],
                            template: set.privatVoices.template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                        
                    } else if(args[1] == "template") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.template))

                        let template = args.slice(2).join(" ");
                        if(!template) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.template))
                        if(template.replace(`NAME`, `${message.author.username}`) == template) return addlib.errors.falseArgs(message,"Не содержится переменная NAME!")
                        if(template.length>=67) return addlib.errors.falseArgs(message,"Нельзя делать такой большой шаблон!")

                        set.privatVoices = {
                            enabled: set.privatVoices.enabled,
                            channel: set.privatVoices.channel,
                            category: set.privatVoices.category,
                            template: template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!');
                    } else {
                        return addlib.errors.falseArgs(message, "<enabled \\|\\| channel \\|\\| category \\|\\| template>")
                    }

                    set.save().catch(err => console.log(err))

                break;
        
                case "welcome":
                    if(!set) return addlib.errors.castom(message,"Обнови конфигурацию!",`${con.prefix}settings configurationupdate`);

                    if(!args[1]) {
                        return addlib.errors.notArgs(message, "<direct \\|\\| server \\|\\| autorole>")
                    } else if(args[1] == "direct") {
                        addlib.errors.doNotWorksNow(message);
                    } else if(args[1] == "server") {
                        if(!args[2]) return addlib.errors.notArgs(message, "<enabled \\|\\| channel \\|\\| message \\|\\| embed>");
                        else if(args[2] == "enabled") {
                            if(!args[3]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.wellcome.server.enabled))
                            let ena = args[3].toLowerCase()
                            if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                            set.wellcome = {
                                direct: set.wellcome.direct,
                                server: {
                                    enabled: (ena == 'true'),
                                    channel: set.wellcome.server.channel, 
                                    message: set.wellcome.server.message,
                                    embed: set.wellcome.server.embed
                                },
                                autorole: set.wellcome.autorole
                            }
                        } else if(args[2] == "channel") {
                            if(!args[3]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.wellcome.server.channel || "**Нет...**")))
                            if(!message.guild.channels.cache.get(args[3])) return addlib.errors.noChannel(message)
                            if(message.guild.channels.cache.get(args[3]).type != 'text') return addlib.errors.falseArgs(message, `Канал не является текстовым.`)
                            if (!message.guild.channels.cache.get(args[3]).permissionsFor(bot.user).has('SEND_MESSAGES')) return addlib.errors.botNotPerms(message)
                            set.wellcome = {
                                direct: set.wellcome.direct,
                                server: {
                                    enabled: set.wellcome.server.enabled,
                                    channel: args[3], 
                                    message: set.wellcome.server.message,
                                    embed: set.wellcome.server.embed
                                },
                                autorole: set.wellcome.autorole
                            }
                        } else if(args[2] == "message") {
                            if(!args[3]) return message.channel.send(con.defEmb.setTitle('Текущее значение:').setDescription(set.wellcome.server.message || "**Нет...**"))
                            if(args.slice(3).join(' ').length>500) return addlib.errors.falseArgs(message, `Приветствие не может быть больше 500 символов. Сори...`)
                            set.wellcome = {
                                direct: set.wellcome.direct,
                                server: {
                                    enabled: set.wellcome.server.enabled,
                                    channel: set.wellcome.server.channel,
                                    message: args.slice(3).join(' '),
                                    embed: set.wellcome.server.embed
                                },
                                autorole: set.wellcome.autorole
                            }
                        } else if(args[2] == "embed") {
                            if(!args[3]) return addlib.errors.notArgs(message, "<enabled \\|\\| color \\|\\| avatar>");
                            if(args[3] == "enabled") {
                                if(!args[4]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.wellcome.server.embed.enabled))
                                let ena = args[4].toLowerCase()
                                if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                                set.wellcome = {
                                    direct: set.wellcome.direct,
                                    server: {
                                        enabled: set.wellcome.server.enabled,
                                        channel: set.wellcome.server.channel, 
                                        message: set.wellcome.server.message,
                                        embed: {
                                            enabled: (ena == 'true'),
                                            color: set.wellcome.server.embed.color,
                                            avatar: set.wellcome.server.embed.avatar
                                        }
                                    },
                                    autorole: set.wellcome.autorole
                                }
                            } else if(args[3] == "avatar") {
                                if(!args[4]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.wellcome.server.embed.avatar))
                                let ena = args[4].toLowerCase()
                                if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")    
                                set.wellcome = {
                                    direct: set.wellcome.direct,
                                    server: {
                                        enabled: set.wellcome.server.enabled,
                                        channel: set.wellcome.server.channel, 
                                        message: set.wellcome.server.message,
                                        embed: {
                                            enabled: set.wellcome.server.embed.enabled,
                                            color: set.wellcome.server.embed.color,
                                            avatar: (ena == 'true')
                                        }
                                    },
                                    autorole: set.wellcome.autorole
                                }
                            } else if(args[3] == "color") {
                                if(!args[4]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.wellcome.server.embed.avatar || "**Нет...**")))
                                let c = args[4].toLowerCase()
                                if(!/[\da-f]{6}/.test(c) || c.length != 6) return addlib.errors.falseArgs(message,"Цвет нужно вводить в формате RRGGBB!")
                                set.wellcome = {
                                    direct: set.wellcome.direct,
                                    server: {
                                        enabled: set.wellcome.server.enabled,
                                        channel: set.wellcome.server.channel, 
                                        message: set.wellcome.server.message,
                                        embed: {
                                            enabled: set.wellcome.server.embed.enabled,
                                            color: c,
                                            avatar: set.wellcome.server.embed.avatar
                                        }
                                    },
                                    autorole: set.wellcome.autorole
                                }
                            } else {
                                return addlib.errors.falseArgs(message, "<enabled \\|\\| color \\|\\| avatar>")
                            }
                        } else {
                            return addlib.errors.falseArgs(message, "<direct \\|\\| server \\|\\| autorole>")
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                    } else if(args[1] == "autorole") {
                        /*
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoices.category))
                        if(!message.guild.channels.cache.get(args[2])) return addlib.errors.falseArgs(message)
                        if(message.guild.channels.cache.get(args[2]).type != 'category') return addlib.errors.falseArgs(message, `Канал не является категорией!`) 
                        
                        set.privatVoices = {
                            enabled: set.privatVoices.enabled,
                            channel: set.privatVoices.channel,
                            category: args[2],
                            template: set.privatVoices.template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                        */
                        addlib.errors.doNotWorksNow(message);
                    } else {
                        return addlib.errors.falseArgs(message, "<enabled \\|\\| channel \\|\\| category \\|\\| template>")
                    }

                    set.save().catch(err => console.log(err))
                break;

                case "logchannel":
                    if(!args[1]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.other.logChannel || 'Нет...')))
                    if(!message.guild.channels.cache.get(args[1])) return addlib.errors.noChannel(message)
                    if(message.guild.channels.cache.get(args[1]).type != 'text') return addlib.errors.falseArgs(message, `Канал не является текстовым.`)
                    if (!message.guild.channels.cache.get(args[1]).permissionsFor(bot.user).has('SEND_MESSAGES')) return addlib.errors.botNotPerms(message)

                    set.other = {
                        logChannel: args[1],
                        adminRole: set.other.adminRole
                    }

                    addlib.errors.success(message, 'Конфигурация успешно изменена!')
                break;

                default:
                    return addlib.errors.falseArgs(message);
            }
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
    cmd: ["settings"],
    desc: "Настройка сервера",
    category: "Для модерации",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Приветствие:',`*Всё начинается на \`${con.prefix}settings welcome\`*\n**server enabled <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть значение приветствий на сервере\n**server channel <ID \\|\\| Ничего>** - Записать новый ID/посмотреть ID записанного канала для приветствий на сервере *(ВВОДИТЬ ТОЛЬКО ID!)*\n**server message <message \\|\\| Ничего>** - Записать новое/посмотреть старое приветствие на сервере. Может содержать такие переменные как: MEMBER, SERVER, COUNT\n**server embed enabled <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть текущее значение отправки embed-сообщения на сервере\n**server embed avatar <true \\|\\| false \\|\\| Ничего>** - Включить/выключить/посмотреть текущее значение отправки аватара в embed-сообщении на сервере\n**server embed color <color \\|\\| Ничего>** - Изменить/посмотреть цвет embed-сообщения на сервере`)
        .addField('Приватные голосовые каналы:',`*Всё начинается на \`${con.prefix}settings privateVoices\`*\n**enabled <true \\|\\| false>** - Включит/выключит приватные каналы\n**channel <ID>** - Обновит канал *(ВВОДИТЬ ТОЛЬКО ID!)*\n**category <ID>** - Обновит категорию *(ВВОДИТЬ ТОЛЬКО ID!)*\n**template <template>** - Обновит шаблон, должен содержать в себе NAME (большим регистром), которое заменится на имя человека`)
        .addField('Другое:', `*Всё начинается на \`${con.prefix}settings\`*\n**configurationUpdate** - Создаст или сбросит конфигурацию бота\n**logChannel <id \\|\\| Ничего>** - Указать канал для ошибок в настройках\n`)
        .addField('Могут использовать:','Создатель',true)
    },
    show: true
}