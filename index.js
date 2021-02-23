const discord = require("discord.js");
const config = require("./config.json");
const { join } = require("path");
const messages = require("./messages").en;

console.log(messages.welcome);
console.log(messages.clientInitialization.start);
const client = new discord.Client(
    {
        ws: {
            intents: discord.Intents.ALL
        },
        partials: [
            "MESSAGE",
            "REACTION",
            "CHANNEL",
            "GUILD_MEMBER",
            "USER"
        ]
    }
);

client.helps = {} //  Нету con? Теперь есть)

client.commands = new Array();

client.on("message", async function(message) {
    // Условие в котором по одной из причин бот не будет реагировать. А именно:
    // Если автор сообщения - бот.
    // Или сообщение не начинается с префикса бота.
    // Или тип канала - dm, т. е. ЛС.
    if (message.author.bot || !message.content.startsWith(config.prefix) || message.channel.type == "dm") return;

    const messageArray = message.content.split(/\s+/g),
          cmd          = messageArray[0].slice(config.prefix.length),
          args         = messageArray.slice(1);
    
    for (const command of client.commands) {
        if (command.aliases.indexOf(cmd) != -1) {
            if (
                !message.member.permissions.has(
                    new discord.Permissions(command.userPermissions)
                )
            ) return client.emit("commandError",
                {
                    "type": "MissingPermissions",
                    "author": message.member
                });
            if (!message.guild.me.permissions.has(
                new discord.Permissions(command.botPermissions)
                )
            ) return client.emit("commandError", 
                {
                    "type": "BotMissingPermissions",
                    "author": message.member,
                    "perms": command.botPermissions
                });
                
            if (command.ownerOnly && config.owners.indexOf(message.author.id) == -1)
                return client.emit("commandError", 
                {
                    "type": "NotOwner",
                    "author": message.author
                });

            client.helps.footer = message.author.username +' | © Night Devs',
            command.run(message, client, args);
        }
    }
});

console.log(messages.clientInitialization.endSuccess);

console.log(messages.commandsLoader.start);
require("./lib/loader").loadAll(join(__dirname, ".", "commands"), client);

console.log(messages.commandsLoader.endSuccess);

client.login(config.token);