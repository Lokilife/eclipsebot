//  Дароу
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
let prefix        = "e.";
let cmds          = [];
let color         = COLORS.default;
let feedBackChan  = "770009648023339049";

bot.login(CONFIG.token); //  Логиним бота
mongoose.connect(CONFIG.mongoToken, {useNewUrlParser: true, useUnifiedTopology: true}); //  Логиним mongoose

fs.readdir("./cmd/", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
		console.log("Не могу найти команды!");
		return;
	}

	jsfile.forEach((f) =>{
		let props = require(`./cmd/${f}`);
		console.log(`${f} загружен!`);
		if(typeof props.cmd == 'string') bot.commands.set(`${props.cmd}`, props);
		else if(typeof props.cmd == 'object') {
			for(let i2=0;i2<=props.cmd.length-1;i2++) {
				bot.commands.set(props.cmd[i2], props);
			}
        }
        if(props.show) cmds.push({"cmd":props.cmd,"desc":props.desc,"category":props.category})
	});
});

bot.on("ready", () => {
    console.log('Готов!');

    bot.user.setActivity("аниме | e.? - Помощь", {type: "WATCHING"}); // Выставляем активность
});

bot.on('raw', async (event) => { try {
    if(event.t === 'VOICE_STATE_UPDATE') { // Создание приваток
        SETTINGS.findOne({serverID:event.d.guild_id}, (err,set) => {
            if(err) console.log(err);

            if(!set) return;

            if(!set.privatVoises.enabled) return;
            if(event.d.channel_id !== set.privatVoises.channel) return;

            let server = bot.guilds.cache.get(event.d.guild_id);
            let member = server.members.cache.get(event.d.user_id);
            let name   = set.privatVoises.template.replace(`NAME`, `${member.user.username}`);
            
            if(server.channels.cache.find(n=>n.name === name)) return member.voice.setChannel(server.channels.find(n=>n.name === name).id)
            
            if(!server.channels.cache.get(set.privatVoises.category)) return;
            if(server.channels.cache.get(set.privatVoises.category).type != 'category') return;

            server.channels.create(`${name}`, {type: 'voice', parent: set.privatVoises.category}).then(channel => {
                member.voice.setChannel(channel);
                var intr = setInterval(()=>{
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

bot.on("message", async (message) => {try{
    if(message.author.bot) return; //  Не слушаем других ботов
    if(message.channel.type == 'dm') return; //  Не слушаем ЛС

    let messageArray  = message.content.replace(/\s+/g, ' ').split(" ");
	let cmd           = messageArray[0];
    let args          = messageArray.slice(1);

    let commandfile
	if(cmd.substr(0, prefix.length) == prefix) commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args,{
        "cmds":cmds,
        "prefix":prefix,
        "color": color,
        "defEmb": new discord.MessageEmbed().setColor(color),
        "footer": message.author.username +' | © Night Devs',
        "categories": ['Общее','Картинки','Прочее','Для модерации'],
        "feedBackChannel": feedBackChan,
        "cmd": cmd
        //"moderators": [],
        //"logchannel": allSettings.logChannel
    });
}catch (err) {console.log(err)}})

