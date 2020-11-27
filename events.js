const SETTINGS = require('./models/settings.js');

module.exports.raw = (bot,event) => { try {
    if(event.t === 'VOICE_STATE_UPDATE') { // Создание приваток
        SETTINGS.findOne({serverID:event.d.guild_id}, (err,set) => { //  Заходим в БД
            if(err) console.log(err); //  Ошибки идут (нахер) в консоль

            if(!set) return; //  Забить, если настроек нет

            if(!set.privatVoices) return; //  Забить если нет настроек приваток
            if(!set.privatVoices.enabled) return; //  Забить если выключено
            if(event.d.channel_id !== set.privatVoices.channel) return; //  Забить если это не тот канал

            let server = bot.guilds.cache.get(event.d.guild_id); 
            let member = server.members.cache.get(event.d.user_id);
            let name   = set.privatVoices.template.replace(`NAME`, `${member.user.username}`);
            
            if(server.channels.cache.find(n=>n.name === name)) return member.voice.setChannel(server.channels.find(n=>n.name === name).id) //  Если таков уже существует
            
            if(!server.channels.cache.get(set.privatVoices.category)) return; //  Забить если такой категории не существует
            if(server.channels.cache.get(set.privatVoices.category).type != 'category') return; //  Забить если это, блин, не категория.

            server.channels.create(`${name}`, {type: 'voice', parent: set.privatVoices.category}).then(channel => { //  Создаём канал, затем
                member.voice.setChannel(channel); //  Перемещаем человека
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
}catch(err){console.log(err)}}