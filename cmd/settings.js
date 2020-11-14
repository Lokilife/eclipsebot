/* eslint-disable no-case-declarations */
const addlib = require('../addLib.js');
const settings = require('../models/settings.js');
//const mongoose  = require('mongoose');

module.exports = {
    run: async (bot,message,args,con)=> {try{
        if(!args[0]) return addlib.errors.notArgs(message, "Напиши аргумент **help** для помощи по команде")

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
                                logChannel:"",
                                admins: {
                                    roles: [],
                                    members: []
                                }
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
                            logChannel:"",
                            admins: {
                                roles: [],
                                members: []
                            }
                        }

                        set.save().catch(err => console.log(err))
                    }

                    addlib.errors.success(message,"Конфигурация успешно обновлена!");
                    
                break;

                case "privatevoices":
                    if(!set) return addlib.errors.castom(message,"Обнови конфигурацию!",`${con.perfix}settings configurationupdate`);

                    if(!args[1]) {
                        return addlib.errors.notArgs(message, "<enabled || channel || category || template>")
                    } else if(args[1] == "enabled") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+(set.privatVoises.enabled || "**Нет...**")))
                        let ena = args[2].toLowerCase()
                        if(ena != "true" && ena != "false") return addlib.errors.falseArgs(message,"true или false?")
                        set.privatVoises = {
                            enabled: (args[2] == 'true'),
                            channel: set.privatVoises.channel,
                            category: set.privatVoises.category,
                            template: set.privatVoises.template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                    } else if(args[1] == "channel") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoises.channel))
                        if(!message.guild.channels.cache.get(args[2])) return addlib.errors.falseArgs(message)
                        if(message.guild.channels.cache.get(args[2]).type != 'voice') return addlib.errors.falseArgs(message) 
                        set.privatVoises = {
                            enabled: set.privatVoises.enabled,
                            channel: args[2],
                            category: set.privatVoises.category,
                            template: set.privatVoises.template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                    } else if(args[1] == "category") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoises.category))
                        if(!message.guild.channels.cache.get(args[2])) return addlib.errors.falseArgs(message)
                        if(message.guild.channels.cache.get(args[2]).type != 'category') return addlib.errors.falseArgs(message) 
                        
                        set.privatVoises = {
                            enabled: set.privatVoises.enabled,
                            channel: set.privatVoises.channel,
                            category: args[2],
                            template: set.privatVoises.template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!')
                        
                    } else if(args[1] == "template") {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoises.template))

                        let template = args.slice(2).join(" ");
                        if(!template) return message.channel.send(con.defEmb.setTitle('Текущее значение: '+set.privatVoises.template))
                        if(template.replace(`NAME`, `${message.author.username}`) == template) return addlib.errors.falseArgs(message,"Не содержится переменная NAME!")
                        if(template.length>=67) return addlib.errors.falseArgs(message,"Нельзя делать такой большой шаблон!")

                        set.privatVoises = {
                            enabled: set.privatVoises.enabled,
                            channel: set.privatVoises.channel,
                            category: set.privatVoises.category,
                            template: template
                        }
                        addlib.errors.success(message, 'Конфигурация успешно изменена!');
                        
                    }

                    set.save().catch(err => console.log(err))

                break;
        
                //  Сейчас НЕ работает!
                case "admins":
                    if(!args[1]) {
                        return addlib.errors.notArgs(message, "<role || member>")
                    } else if(args[1] == 'role') {
                        if(!args[2]) return message.channel.send(con.defEmb.setTitle(`Текущее значение: ${set.other.admins.roles || "Нет"}`))
                        else if(args[2] == "add"){
                            if(!args[3]) return addlib.errors.notArgs(message,"<ID роли>")
                            if(!message.guild.roles.cache.get(args[3])) return addlib.errors.falseArgs(message,"Такой роли не существует!")
                            let arr = set.other.admins.roles
                            arr.splice(0,0,args[3])
                            arr = Array.from(new Set(arr));
                            //let admrole = Array.from(new Set(set.other.admins.roles))
                            /*
                            set.other = {
                                logChannel: set.other.logChannel,
                                admins: {
                                    roles: admrole,
                                    members: set.other.admins.members
                                }
                            };
                            */

                            set.other = {
                                logChannel: set.other.logChannel,
                                admins: {
                                    roles: [].splice(0,0,set.other.admins.roles),
                                    members: []
                                }
                            }
                            console.log(set.other);
                            try {
                                set.save()
                            } catch (error) {
                                console.log(error)
                            }
                            
                        } else if(args[2] == "remove"){
                            return
                            /*
                            if(!message.guild.roles.cache.get(args[3])) return addlib.errors.falseArgs(message,"Такой роли не существует!")
                            let admrole = set.other.admins.roles;
                            admrole.push(args[3])
                            admrole = Array.from(new Set(admrole))*/
                        }
                    }
                    addlib.errors.success(message, 'Конфигурация успешно изменена!');
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
        .addField('Аргументы:',`**configurationUpdate** - Создаст или сбросит конфигурацию бота\n**privateVoices enabled <true || false>** - Включит/выключит приватные каналы\n**privateVoices channel <ID>** - Обновит канал *(ВВОДИТЬ ТОЛЬКО ID!)*\n**privateVoices category <ID>** - Обновит категорию *(ВВОДИТЬ ТОЛЬКО ID!)*\n**privateVoices template <template>** - Обновит шаблон, должен содержать в себе NAME (большим регистром), которое заменится на имя человека`)
        .addField('Примеры:',`**${con.prefix}settings configurationUpdate** - Создаст или сбросит конфигурацию бота`)
        .addField('Могут использовать:','Создатель и админы',true)
    },
    show: true
}