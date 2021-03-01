const discord = require("discord.js");
const config = require("./config.json");
const { join } = require("path");
const messages = require("./messages")[config.lang];
const typeorm = require("typeorm");

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

client.helps = {};

client.commands = new Array();

client.on("message", async function(message) {
    if (message.author.bot || !message.content.startsWith(config.prefix) || message.channel.type == "dm") return;

    const messageArray = message.content.split(/\s+/g),
          cmd          = messageArray[0].slice(config.prefix.length),
          args         = messageArray.slice(1);
    
    for (const command of client.commands) {
        if (command.aliases.indexOf(cmd) != -1) {
            if (!message.member.permissions.has(new discord.Permissions(command.userPermissions))) return client.emit("commandError",
                {
                    "type": "MissingPermissions",
                    "message": message,
                    "clientGuild": message.guild.me,
                    "author": message.member,
                    "perms": command.userPermissions
                });
            if (!message.guild.me.permissions.has(
                new discord.Permissions(command.botPermissions)
                )
            ) return client.emit("commandError", 
                {
                    "type": "BotMissingPermissions",
                    "message": message,
                    "clientGuild": message.guild.me,
                    "author": message.member,
                    "perms": command.botPermissions
                });
            if (command.ownerOnly && config.owners.indexOf(message.author.id) == -1)
                return client.emit("commandError", 
                {
                    "type": "NotOwner",
                    "message": message,
                    "author": message.author
                });

            client.helps.footer = message.author.username +' | © Night Devs';
                command.run(message, client, args).catch((e)=>{
                    client.emit("commandError",
                        {
                            "type": "unknown",
                            "message": message,
                            "author": message.author,
                            "error": e
                        })
                });
        }
    }
});

console.log(messages.clientInitialization.endSuccess);

console.log(messages.commandsLoader.start);
require("./lib/loader").loadCommands(join(__dirname, ".", "commands"), client);

console.log(messages.commandsLoader.endSuccess);

console.log(messages.listenersLoader.start);
require("./lib/loader").loadListeners(join(__dirname, ".", "listeners"), client);

console.log(messages.listenersLoader.endSuccess);

typeorm.createConnection({
    type: "mongodb",
    url: config.mongo_uri,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [
        require("./models/custom"),
        require("./models/guilds"),
        require("./models/private-voices")
    ]
});

client.login(config.token);
client.on('ready', () => console.log(messages.client.start));