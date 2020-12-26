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
                                    message: "MEMBER, добро пожаловать на сервер! Ты уже **COUNT**!",
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
                                    message: "MEMBER, добро пожаловать на сервер! Ты уже **COUNT**!",
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
                                    message: "Прощай MEMBER! Заходи, если что!",
                                    title: "Прощай MEMBER!",
                                    description: "Заходи, если что!)",
                                    color: "cc0000"
                                },
                                server: {
                                    enabled: false,
                                    embed: false,
                                    channel: "",
                                    message: "Прощай MEMBER! Увидимся позже! Нас осталось **COUNT**!",
                                    title: "Человек ушёл",
                                    description: "Прощай MEMBER! Увидимся позже! Нас осталось **COUNT**!!",
                                    color: "cc0000",
                                    avatar: true
                                }
                            },
                            privatVoices: {
                                enabled: false,
                                channel: "",
                                category: "",
                                template: "<+> NAME",
                                position: "0"
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
                                embed: false,
                                message: "MEMBER, добро пожаловать на сервер! Ты уже **COUNT**!",
                                title: "Новый человек!",
                                description: "Добро пожаловать, MEMBER! Ты уже **COUNT**!",
                                color: "00ce00"
                            },
                            server: {
                                enabled: false,
                                embed: false,
                                channel: "",
                                message: "MEMBER, добро пожаловать на сервер! Ты уже **COUNT**!",
                                title: "Новый человек!",
                                description: "Добро пожаловать, MEMBER! Ты уже **COUNT**!",
                                color: "00ce00",
                                avatar: true
                            },
                            autorole: {
                                enabled: false,
                                role: ""
                            }
                        }

                        set.goodbye = {
                            direct: {
                                enabled: false,
                                embed: false,
                                message: "Прощай MEMBER! Заходи, если что!",
                                title: "Прощай MEMBER!",
                                description: "Заходи, если что!)",
                                color: "cc0000"
                            },
                            server: {
                                enabled: false,
                                embed: false,
                                channel: "",
                                message: "Прощай MEMBER! Увидимся позже! Нас осталось **COUNT**!",
                                title: "Человек ушёл",
                                description: "Прощай MEMBER! Увидимся позже! Нас осталось **COUNT**!!",
                                color: "cc0000",
                                avatar: true
                            }
                        }

                        set.privatVoices = {
                            enabled: false,
                            channel: "",
                            category: "",
                            template: "<+> NAME",
                            position: "0"
                        }

                        set.other = {
                            logChannel:"",
                            adminRole:""
                        }

                        set.save().catch(err => console.log(err))
                    }

                    addlib.errors.success(message,"Конфигурация успешно обновлена!");
                    
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
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["settings"],
    desc: "Настройка сервера",
    category: "Настройки",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:', `*Всё начинается на \`${con.prefix}settings\`*\n**configurationUpdate** - Создаст или сбросит конфигурацию бота\n**logChannel <id \\|\\| Ничего>** - Указать канал для ошибок в настройках\n`)
        .addField('Могут использовать:','Создатель',true)
    },
    show: true
}