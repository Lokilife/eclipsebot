const roleReactionsSettings = require("../models/role-reactions-settings");
const guilds = require("../models/guilds");
const typeorm = require("typeorm");

module.exports = [
    // Даже если сообщение не кешировано, событие
    // затригерится потому что оно включено в partials клиента.
    {
        // Добавление ролей
        name: "messageReactionAdd",
        /**
         * 
         * @param {Client} client 
         * @param {MessageReaction} reaction 
         * @param {User} user 
         * @returns 
         */
        run: async function(client, reaction, user) {
            // Если реакцию поставил бот или вне сервера
            if (user.bot || !reaction.message.guild) return;
            const guild = reaction.message.guild,
                  member = guild.members.cache.get(user.id);

            const manager   = typeorm.getMongoManager(),
                  settings  = manager.getRepository(roleReactionsSettings).findOne({_id: reaction.message.id}); 
            if (settings && await (await manager.getRepository(guilds).findOne({_id: guild.id.toString()})).reactionRolesEnabled) { // Если сообщение находится в БД и выдача ролей включена
                const role_id = (await settings).roles[reaction.emoji.name] || (await settings).roles[reaction.emoji.id];
                if (role_id) { // Если эмоджи с ролью определён в базе данных
                    const role = guild.roles.cache.get(role_id);
                    if (!role || role.position >= guild.me.roles.highest.position) { // Если роль выше роли бота, тогда удалить её из базы данных
                        delete settings.roles[reaction.emoji.name];
                        delete settings.roles[reaction.emoji.id];
                        await manager.getRepository(roleReactionsSettings).updateOne({_id: guild.id}, {$set:{roles: settings.roles}});
                        return;
                    }
                    await member.roles.add(role)
                    .catch(async(e) => {
                        if (e.code === 50013) { // Недостаточно прав
                            await manager.getMongoRepository(guilds).updateOne({_id: guild.id}, {$set: {roleReactionEnabled: false}});
                            guild.owner.send(
                                "У бота недостаточно прав чтобы выдавать автоматически роли по реакциям. "+
                                "Выдайте боту права управления ролями и снова включите роли по реакциям, настраивать роли снова не нужно, они сохранены.\n\n"+
                                "Данное сообщение отправлено автоматически, на него не нужно отвечать.")
                                .catch(()=>{});
                        }
                    });
                }
            }
        }
    },
    {
        // Убирание ролей
        name: "messageReactionRemove",
        /**
         * 
         * @param {Client} client 
         * @param {MessageReaction} reaction 
         * @param {User} user 
         * @returns 
         */
        run: async function(client, reaction, user) {
            // Если реакцию поставил бот или вне сервера
            if (user.bot || !reaction.message.guild) return;
            const guild = reaction.message.guild,
                  member = guild.members.cache.get(user.id);

            const manager   = typeorm.getMongoManager(),
                  settings  = manager.getRepository(roleReactionsSettings).findOne({_id: reaction.message.id}); 
            if (settings && await (await manager.getRepository(guilds).findOne({_id: guild.id.toString()})).reactionRolesEnabled) { // Если сообщение находится в БД и выдача ролей включена
                const role_id = (await settings).roles[reaction.emoji.name] || (await settings).roles[reaction.emoji.id];
                if (role_id) { // Если эмоджи с ролью определён в базе данных
                    const role = guild.roles.cache.get(role_id);
                    if (!role || role.position >= guild.me.roles.highest.position) { // Если роль выше роли бота, тогда удалить её из базы данных
                        delete settings.roles[reaction.emoji.name];
                        delete settings.roles[reaction.emoji.id];
                        await manager.getRepository(roleReactionsSettings).updateOne({_id: guild.id}, {$set:{roles: settings.roles}});
                        return;
                    }
                    await member.roles.remove(role)
                    .catch(async(e) => {
                        if (e.code === 50013) { // Недостаточно прав
                            await manager.getMongoRepository(guilds).updateOne({_id: guild.id}, {$set: {roleReactionEnabled: false}});
                            guild.owner.send(
                                "У бота недостаточно прав чтобы выдавать автоматически роли по реакциям. "+
                                "Выдайте боту права управления ролями и снова включите роли по реакциям, настраивать роли снова не нужно, они сохранены.\n\n"+
                                "Данное сообщение отправлено автоматически, на него не нужно отвечать.")
                                .catch(()=>{});
                        }
                    });
                }
            }
        }
    }
]