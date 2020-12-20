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
                                    embed: false,
                                    message: "MEMBER, добро пожаловать на **SERVER**! Ты уже **COUNT**!",
                                    title: "Новый человек!",
                                    description: "Добро пожаловать, MEMBER! Ты уже **COUNT**!",
                                    color: "00ce00"
                                    /*
                                    enabled: false,
                                    message: "MEMBER, добро пожаловать на **SERVER**!",
                                    embed: {
                                        enabled: false,
                                        color: "",
                                        avatar: false
                                    }
                                    */
                                },
                                server: {
                                    enabled: false,
                                    embed: false,
                                    channel: "",
                                    message: "MEMBER, добро пожаловать на **SERVER**! Ты уже **COUNT**!",
                                    title: "Новый человек!",
                                    description: "Добро пожаловать, MEMBER! Ты уже **COUNT**!",
                                    color: "00ce00",
                                    avatar: true
                                    /*
                                    embed: {
                                        enabled: false,
                                        color: "",
                                        avatar: true
                                    }
                                    */
                                },
                                autorole: {
                                    enabled: false,
                                    role: ""
                                }
                            },
                            goodbye: {
                                direct: {
                                    enabled: false,
                                    embed: false,
                                    message: "MEMBER, добро пожаловать на **SERVER**! Ты уже **COUNT**!",
                                    title: "Новый человек!",
                                    description: "Добро пожаловать, MEMBER! Ты уже **COUNT**!",
                                    color: "00ce00"
                                },
                                server: {
                                    enabled: false,
                                    embed: false,
                                    channel: "",
                                    message: "MEMBER, добро пожаловать на **SERVER**! Ты уже **COUNT**!",
                                    title: "Новый человек!",
                                    description: "Добро пожаловать, MEMBER! Ты уже **COUNT**!",
                                    color: "00ce00",
                                    avatar: true
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
    category: "Настройки",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Приватные голосовые каналы:',`*Всё начинается на \`${con.prefix}settings privateVoices\`*\n**enabled <true \\|\\| false>** - Включит/выключит приватные каналы\n**channel <ID>** - Обновит канал *(ВВОДИТЬ ТОЛЬКО ID!)*\n**category <ID>** - Обновит категорию *(ВВОДИТЬ ТОЛЬКО ID!)*\n**template <template>** - Обновит шаблон, должен содержать в себе NAME (большим регистром), которое заменится на имя человека`)
        .addField('Другое:', `*Всё начинается на \`${con.prefix}settings\`*\n**configurationUpdate** - Создаст или сбросит конфигурацию бота\n**logChannel <id \\|\\| Ничего>** - Указать канал для ошибок в настройках\n`)
        .addField('Могут использовать:','Создатель',true)
    },
    show: true
}