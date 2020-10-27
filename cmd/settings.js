const addlib = require('../addLib.js');
const settings = require('../models/settings.js');
//const mongoose  = require('mongoose');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return addlib.errors.notArgs(message)

        if(args[0] == "help") {
            return message.channel.send(con.defEmb.setTitle("Помощь по команде settings").setDescription("Настройка сервера").setFooter(con.footer)
            .addField('Аргументы:',`**configurationUpdate** - Создаст или сбросит конфигурацию бота`)
            .addField('Примеры:',`**${con.prefix}settings configurationUpdate** - Создаст или сбросит конфигурацию бота`)
            .addField('Могут использовать:','Создатель и админы',true)
            .addField('Последнее обновление:',`Версия 1.0.0`,true)
            )
        }



        switch (args[0]) {
            case "configurationUpdate":
                settings.findOne({serverID:message.guild.id},(err,set)=> {
                    if(err) {
                        addlib.errors.unknow(message,`Код ошибки: \`\`\`${err}\`\`\``);
                        console.log(err);
                    }

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
                            defense: {
                                enabled: true,
                                exceptions: {
                                    members: [],
                                    channels: [],
                                    roles: []
                                }
                            },
                            pivatVoises: {
                                enabled: false,
                                channel: "",
                                category: "",
                                template: "<+> NAME"
                            },
                            other: {
                                logChannel:""
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

                        set.defense = {
                            enabled: true,
                            exceptions: {
                                members: [],
                                channels: [],
                                roles: []
                            }
                        }

                        set.privatVoises = {
                            enabled: false,
                            channel: "",
                            category: "",
                            template: "<+> NAME"
                        }

                        set.other = {
                            logChannel:""
                        }

                        set.save().catch(err => console.log(err))
                    }

                    message.channel.send('Ок!')

                })
            break;


    
            default:
                return addlib.errors.falseArgs(message);
        }
    }catch(err){console.log(err)}},
    cmd: "settings",
    desc: "Настройка сервера",
    category: "Для модерации"
}