const discord  = require("discord.js");
const config   = require("../config.json");
const errors   = require("../lib/errors.js");

module.exports = {
    /**
     * @param {Message} message 
     * @param {Client} bot
     * @param {Array<String>} args
     */
    "run": async function(message, bot, args) {
        if(args[0]) {
            let ok = false;
            for(let i=0;i<=bot.commands.length-1;i++) {
                for(let i2=0;i2<=bot.commands[i].aliases.length-1;i2++){
                    if(bot.commands[i].aliases[i2] == args[0]) {
                        message.channel.send(
                            new discord.MessageEmbed().setColor(config.colors.default)
                            .setTitle(`Помощь по команде ${bot.commands[i].name}`)
                            .setDescription(bot.commands[i].help.desciption)
                            .addField('Использование:', bot.commands[i].help.usage)
                            .addField('Примеры:', bot.commands[i].help.examples.join("\n"))
                            .setFooter(bot.helps.footer)
                        )
                        ok = true;
                        break;
                    }
                }
                if(ok) break;
            }
            if(!ok) errors.falseArgs(message,"Такой команды/алиаса не существует!")
        }

        let categories = [];
        bot.commands.forEach(value => {if(categories.indexOf(value.help.category) == -1) categories.push(value.help.category)});

        let emb         = new discord.MessageEmbed().setColor(config.colors.default).setTitle('Помощь').setDescription(`\`${config.prefix}help <команда>\` для углублённой помощи по команде'`).setFooter(bot.helps.footer)
        let numbers     = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"] //  Ты целый мап сделал для этого. Я разобрался одним массивом!
        
        let fields = {
            "1️⃣": {
                "name": "Содержание",
                "value": ""
            }
        }

        let titVal = "1. Содержание\n";
        for(let i=0; i <= categories.length-1; i++) {
            titVal = titVal + `${i+2}. ${categories[i]}\n`;
        }

        fields['1️⃣'].value = titVal

        let text = '',
            i1   = 0;
        for(;i1<=categories.length-1;i1++) {
            text = '';

            for(let i2=0;i2<=bot.commands.length-1;i2++) {
                if(bot.commands[i2].help.category == categories[i1]) text = text+`**${config.prefix}${bot.commands[i2].name}** - ${bot.commands[i2].help.desciption}\n` //  Если категории совпадают, то к перемнной с текстом добавляется нужный текст (Команда с её описанием)
            }
            
            if(text == '') text = "Тут пока ничего нет...";

            fields[numbers[i1+1]] = {
                "name": categories[i1],
                "value": text
            }
        }

        message.channel.send(emb.addField(fields['1️⃣'].name,fields['1️⃣'].value))
        .then(async msg=> {

            numbers = numbers.slice(0,i1+1)
            
            for (const number of numbers) await msg.react(number);

            let filter     = (reaction,user) => numbers.includes(reaction.emoji.name) && user.id === message.author.id
            let collector  = msg.createReactionCollector(filter, {idle:1e4});

            collector.on('collect',(r) => {
                try {
                    msg.reactions.cache.get(r.emoji.name).users.remove(message.client.users.cache.get(message.author.id));
                } catch (err) {console.log(err)}

                emb.fields = [fields[r.emoji.name]];
                msg.edit(emb)
            });
            
            collector.on('end', async () => {
                try {
                    await msg.reactions.removeAll();
                    await msg.edit(emb.setFooter(`[Время истекло] ${bot.helps.footer}`));
                } catch (err) {console.log(err)}
            })
        })
    },
    "name": "help",
    "aliases": ["help", "?", "h"],
    "botPermissions": ["MANAGE_MESSAGES"],
    "help": {
        "category": "Общее",
        "desciption": "Помощь по командам",
        "shortDescription": "Помощь",
        "usage": "help [?command]",
        "examples": [
            "help",
            "help ping"
        ],
    }
}

/*
TODO!!!:

88,97 строка : console.log. Возможно захочешь что-то с этим сделать
*/