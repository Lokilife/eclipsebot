const { Message, Client } = require("discord.js");
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
                if(ok == true) break;
            }
            if(!ok) errors.falseArgs(message,"Такой команды/алиаса не существует!") //  Ахах, а как же я это без addlib сделаю... UPD: Сделал... Не знаю, понравится ли тебе, но если что скажи.
            return
        }

        let categories  = ["Общее", "Прочее"]; //  А вот тут нужно придумать код наполнения
        let emb         = new discord.MessageEmbed().setColor(config.colors.default).setTitle('Помощь').setDescription(`\`${config.prefix}help <команда>\` для углублённой помощи по команде'`).setFooter(bot.helps.footer)
        let numbers     = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"] //  Ты целый мап сделал для этого. Я разобрался одним массивом!
        
        let fields = { //  Содержимое всех страниц
            "1️⃣": {
                "name": "Содержание",
                "value": ""
            }
        }

        //  Разборки с содержанием
        let titVal = "1. Содержание\n";
        for(let i=0; i <= categories.length-1; i++) {
            titVal = titVal + `${i+2}. ${categories[i]}\n`;
        }

        fields['1️⃣'].value = titVal // Тут всё, что у нас получилось закидываем в объект со всем страницами

        let text = '',
            i1   = 0;
        for(;i1<=categories.length-1;i1++) { //  Перебор по категориям
            text = ''; //  Анулируем переменную

            for(let i2=0;i2<=bot.commands.length-1;i2++) { //  Перебор по командам
                if(bot.commands[i2].help.category == categories[i1]) text = text+`**${config.prefix}${bot.commands[i2].name}** - ${bot.commands[i2].help.desciption}\n` //  Если категории совпадают, то к перемнной с текстом добавляется нужный текст (Команда с её описанием)
            }
            
            if(text == '') text = "Тут пока ничего нет..."; //  Если к категории нету команд

            fields[numbers[i1+1]] = { // Добавляем нужный текст к категории в объекте
                "name": categories[i1],
                "value": text
            }
        }

        message.channel.send(emb.addField(fields['1️⃣'].name,fields['1️⃣'].value)) //  Отправляем сообщение с содержанием
        .then(async msg=> {

            numbers = numbers.slice(0,i1+1) //  Убираем лишнее
            numbers.forEach((i)=> {msg.react(i)}) // В одну строку выкладываем все реакции
            //for(let i=0;i<=i1;i++) await msg.react(numbers[i]); //  Старый вариант

            let filter     = (reaction,user) => numbers.includes(reaction.emoji.name) && user.id === message.author.id //  Создаём фильтр
            let collector  = msg.createReactionCollector(filter, {idle:30000}); //  Используя его, создаём коллектор

            collector.on('collect',(r) => { //  Как только что-то получили:
                try {
                    msg.reactions.cache.get(r.emoji.name).users.remove(message.client.users.cache.get(message.author.id)); // Пытаемся удалить эмоцию
                } catch (err) {console.log(err)}

                emb.fields = [fields[r.emoji.name]]; //  Изменяем embed 
                msg.edit(emb) //  Отправляем
            });
            
            collector.on('end', async () => { //  Как только идли закончился, происходит удаление всех реакций
                try {
                    await msg.reactions.removeAll()
                } catch (err) {console.log(err)}
            })
        })
    },
    "name": "help", // Нахера? aliases[0]
    "aliases": ["help", "?", "h"], //  Зачем на русском?
    "help": {
        "category": "Общее",
        "desciption": "Помощь по командам",
        "shortDescription": "Помощь", //  Где ты его использовать то будешь?
        "usage": "help [command]", //  Ух тыж, а без аргументы ты эту команду использовать не сможешь?
        "examples": [ //  Окей, тут ты всё указал...
            "help",
            "help ping"
        ], // Забъём на то, зачем тут массив и что тут нету объяснений...
    }
}

/*
TODO!!!:

1. 16-37 строка : Возможно говнокод.
2. 39 строка    : Захардхожено
3. 88,97 строка : console.log. Возможно сможешь что-то с этим сделать
*/