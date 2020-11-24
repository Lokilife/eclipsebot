//  Дароу
//  Тут я подключил все библиотеки
const discord  = require('discord.js');
//const ms        = require('ms');
//const strftime  = require('strftime').localizeByIdentifier('ru_RU');
const fs        = require('fs');
const mongoose  = require('mongoose');

//  Подключение файлов
const CONFIG    = require('./config.json');
const COLORS    = require('./colors.json');
const SETTINGS  = require('./models/settings.js');

//  Константы
const bot     = new discord.Client();
bot.commands  = new discord.Collection(); // Тут будут храниться команды

//  Переменные
let prefix        = "e."; //  На сколько я знаю, он устновлен везде и, при изменении, изменится тоже везде, НО ЭТО НЕ ТОЧНО!
let cmds          = []; //  Массив с командами. Позже поясню, зачем.
let color         = COLORS.default; //  Если мне понадобится изменить цвет, достаточно будет залезть в один json
let feedBackChan  = "770009648023339049"; //  Канал, в котрый будут автоматически отправляться баги. 

bot.login(CONFIG.token); //  Логиним бота
mongoose.connect(CONFIG.mongoToken, {useNewUrlParser: true, useUnifiedTopology: true}); //  Логиним mongoose
//  CONFIG я конечно же не дам, но там есть только token и mongotoken.

fs.readdir("./cmd/", (err, files) => {
    if(err) console.log(err); //  Если будет ошибка, я об этом узнаю)
    
	let jsfile = files.filter(f => f.split(".").pop() === "js"); //  Ну тут я смотрю все файлы из директории cmd, которые оканчиваются на .js и подключаю их
	if(jsfile.length <= 0){ //  Если их нет, я об этом узнаю
		console.log("Не могу найти команды!");
		return;
	}

	jsfile.forEach((f) =>{ //  Каждый файл:
		let props = require(`./cmd/${f}`); //  подключается
		console.log(`${f} загружен!`); //  оповещается
		if(typeof props.cmd == 'string') bot.commands.set(`${props.cmd}`, props); //  Добавляется в set
		else if(typeof props.cmd == 'object') {
			for(let i2=0;i2<=props.cmd.length-1;i2++) {
				bot.commands.set(props.cmd[i2], props); //  Если он массив, то тут чуть посложнее, я сделал с помощью цикла.
			}
        }
        if(props.show) cmds.push({"cmd":props.cmd,"desc":props.desc,"category":props.category,"helpEmbed":props.helpEmbed})
        //  Тут массив cmds заполняется. 
	});
});

bot.on("ready", () => { //  По готовности 
    console.log(`Готов! Добавлен на ${bot.guilds.cache.size} серверах`); //  оповестить

    bot.user.setActivity("аниме | e.? - Помощь", {type: "WATCHING"}); // начать смотреть аниме. Даа, мой бот тот ещё анимешник)
});

bot.on('raw', async (event) => { try {
    if(event.t === 'VOICE_STATE_UPDATE') { // Создание приваток
        SETTINGS.findOne({serverID:event.d.guild_id}, (err,set) => { //  Заходим в БД
            if(err) console.log(err); //  Ошибки идут (нахер) в консоль

            if(!set) return; //  Забить, если настроек нет

            if(!set.privatVoises) return; //  Забить если нет настроек приваток
            if(!set.privatVoises.enabled) return; //  Забить если выключено
            if(event.d.channel_id !== set.privatVoises.channel) return; //  Забить если это не тот канал

            let server = bot.guilds.cache.get(event.d.guild_id); 
            let member = server.members.cache.get(event.d.user_id);
            let name   = set.privatVoises.template.replace(`NAME`, `${member.user.username}`);
            
            if(server.channels.cache.find(n=>n.name === name)) return member.voice.setChannel(server.channels.find(n=>n.name === name).id) //  Если таков уже существует
            
            if(!server.channels.cache.get(set.privatVoises.category)) return; //  Забить если такой категории не существует
            if(server.channels.cache.get(set.privatVoises.category).type != 'category') return; //  Забить если это, блин, не категория.

            server.channels.create(`${name}`, {type: 'voice', parent: set.privatVoises.category}).then(channel => { //  Создаём канал, затем
                member.voice.setChannel(channel); //  Перемещаем мембера
                var intr = setInterval(()=>{ //  Начинаем следить за каналом. Каждые 5 секунд он смотрит на состояние канала, и если там никого нет, то удаляет его.
                    if(channel.deleted) return clearInterval(intr)
                    if(channel.members.size <= 0) {
                        channel.delete();
                        clearInterval(intr)
                    }
                }, 5000)
            })
        })

	} else return;
}catch(err){console.log(err)}})

bot.on("message", async (message) => {try{ //  На сообение
    if(message.author.bot) return; //  Забиваем, если бот
    if(message.channel.type == 'dm') return; //  Забиваем, если ЛС

    let messageArray  = message.content.replace(/\s+/g, ' ').split(" "); //  Массив из слов/аргументов
	let cmd           = messageArray[0]; //  cmd это самый первый аргумент
    let args          = messageArray.slice(1); //  Далее аргументы без cmd

    let commandfile
    if(cmd.substr(0, prefix.length) == prefix) commandfile = bot.commands.get(cmd.slice(prefix.length));
    //  Если cmd начинается с префикса, то записываем выполняемый файл, если по такой команде он существует
    if(commandfile) commandfile.run(bot,message,args,{ //  Далее делаем вспомагательный массив, он реально может помочь, чтобы потом снова всё это не вычислять и не тратить вычислительную мощь... Но тратить ОЗУ...
        "cmds":cmds,
        "prefix":prefix,
        "color": color,
        "defEmb": new discord.MessageEmbed().setColor(color),
        "footer": message.author.username +' | © Night Devs',
        "categories": ['Общее','Картинки','Прочее','Для модерации'],
        "feedBackChannel": feedBackChan,
        "cmd": cmd
    });
}catch (err) {console.log(err)}})

