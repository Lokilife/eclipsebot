const SETTINGS        = require('./models/settings.js');
const addlib          = require('./addLib.js');
const COLORS          = require('./colors.json');
const {MessageEmbed}  = require('discord.js');

function baseErrEmb_audit (set, member, value, bot) {
    if(set.other && set.other.logchannel) {
        if(member.guild.channels.cache.get(set.other.logchannel).permissionsFor(bot.user).has('SEND_MESSAGES')) 
        addlib.errors.baseErr({channel: member.guild.channels.cache.get(set.other.logchannel)}, value);
    }
    return;
}

function castomErrEmb_audit (set,member,value,bot) {
    if(set.other && set.other.logchannel) {
        if(member.guild.channels.cache.get(set.other.logchannel).permissionsFor(bot.user).has('SEND_MESSAGES')) 
        addlib.errors.castom({channel: member.guild.channels.cache.get(set.other.logchannel)}, value);
    }
    return;
}

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

module.exports.guildMemberAdd_server = (bot,member) => {try {
    SETTINGS.findOne({serverID: member.guild.id}, (err,set) => {
        if(err) console.log(err);

        if(!set) return;

        if(!set.wellcome) return baseErrEmb_audit(set,member,`set.welcome`, bot)
        if(!set.wellcome.server) return baseErrEmb_audit(set,member,`set.welcome.server`, bot)

        if(!set.wellcome.server.enabled) return;
        if(!set.wellcome.server.channel) return castomErrEmb_audit(set,member,'Не указан канал для сообщений о новых пользователях!',bot)
        if(!set.wellcome.server.message) return castomErrEmb_audit(set,member,'Не указано сообщение о новых пользователях!',bot)

        let channel = member.guild.channels.cache.get(set.wellcome.server.channel);

        if (!channel) return castomErrEmb_audit(set,member,'Канала для приветствий не существует!',bot);
        if (!channel.permissionsFor(bot.user).has('SEND_MESSAGES')) return castomErrEmb_audit(set,member,'Я не могу отправлять сообщения в заданный канал для приветствий!',bot);

        let msg

        if(set.wellcome.server.embed == true) {
            msg = new MessageEmbed().setColor(set.wellcome.server.color || COLORS.default)
            .setTitle(set.wellcome.server.title.replace('MEMBER', member.user.username).replace('COUNT', member.guild.members.cache.size))
            .setDescription(set.wellcome.server.description.replace('MEMBER', member.user.username).replace('COUNT', member.guild.members.cache.size))
            
            if(set.wellcome.server.embed.avatar) msg.setThumbnail(member.user.avatarURL()|| member.user.defaultAvatarURL);
        } else {
            msg = set.wellcome.server.message.replace('MEMBER', member.user.username).replace('COUNT', member.guild.members.cache.size);
        }

        channel.send(msg);
    });
}catch (err) {console.log(err)}}