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
const EVENTS    = require('./events.js');
const PACKAGE   = require('./package.json');

//  Константы
const bot     = new discord.Client();
bot.commands  = new discord.Collection(); // Тут будут храниться команды

//  Переменные
let prefix        = "e."; //  На сколько я знаю, он установлен везде и, при изменении, изменится тоже везде, НО ЭТО НЕ ТОЧНО!
let cmds          = []; //  Массив с командами. Позже поясню, зачем.
let color         = COLORS.default; //  Если мне понадобится изменить цвет, достаточно будет залезть в один json
let feedBackChan  = "770009648023339049"; //  Канал, в который будут автоматически отправляться баги. 

bot.login(CONFIG.token); //  Логиним бота
mongoose.connect(CONFIG.mongoToken, {useNewUrlParser: true, useUnifiedTopology: true}); //  Логиним mongoose
//  CONFIG я конечно же не дам, но там есть только token и mongotoken.
//  Подробнее читай на гитхабе в README.md, в разделе MiniWiki.

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

bot.on('raw', async (event) => {try {EVENTS.raw(bot,event)}catch(err){console.log(err)}}) //  Да, тут теперь только один подключенный файл)

bot.on('guildDelete', (guild) => {try {
    SETTINGS.findOneAndDelete({serverID:guild.id}, (err) => {
        if(err) console.log(err)
        //  Заходим в БД и удаляем этот сервер.
        //  Понимаю, бот не всегда работает и, возможно, какие-то сервера останутся, но их будет гораздо меньше.
        //  Когда будет мало места в БД, тогда и займусь удалением остатков
    })
} catch(err){console.log(err)}})

bot.on('guildCreate', (guild) => {
    guild.channels.cache.filter(m => m.type == "text" && m.permissionsFor(bot.user).has('SEND_MESSAGES')).first()
    .send(new discord.MessageEmbed().setColor(COLORS.default).setFooter('И ещё раз спасибо) © Night Devs')
    .setTitle('Спасибо, что добавили Eclipse на сервер!')
    .setDescription(`Бот поддерживает только русский язык!`)
    .addField(`Информация:`,`Префикс бота: \`e.\`\nКоманда справки: \`e.?\`\nВерсия бота: \`${PACKAGE.version}\`\nСвяжитесь с [поддержкой](https://discord.gg/PHuvYMrvdr) при появлении проблем.`)
    .addField(`Полезные ссылки:`,"[Сервер поддержки](https://discord.gg/YM3KMDM) | [GitHub бота](https://github.com/Elektroplayer/eclipsebot) | [Ссылка на бота](https://discord.com/api/oauth2/authorize?client_id=769659625129377812&permissions=1359473878&scope=bot)")
    )
});

bot.on('guildMemberAdd', (member) => {try {
    EVENTS.guildMemberAdd_server(bot,member);
    //EVENTS.guildMemberAdd_direct(bot,member);
    //EVENTS.guildMemberAdd_autorole(bot,member);
} catch (err) {console.log(err)}})

bot.on("message", async (message) => {try{ //  На сообщение
    if(message.author.bot) return; //  Забиваем, если бот
    if(message.channel.type == 'dm') return; //  Забиваем, если ЛС

    let messageArray  = message.content.replace(/\s+/g, ' ').split(" "); //  Массив из слов/аргументов
	let cmd           = messageArray[0]; //  cmd это самый первый аргумент
    let args          = messageArray.slice(1); //  Далее аргументы без cmd

    let commandfile
    if(cmd.substr(0, prefix.length) == prefix) commandfile = bot.commands.get(cmd.slice(prefix.length));
    //  Если cmd начинается с префикса, то записываем выполняемый файл, если по такой команде он существует
    if(commandfile) commandfile.run(bot,message,args,{ //  Далее делаем вспомогательный массив, он реально может помочь, чтобы потом снова всё это не вычислять и не тратить вычислительную мощь... Но тратить ОЗУ...
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

