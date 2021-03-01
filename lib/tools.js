const permissions = new Map()
.set("ADMINISTRATOR", "Администратор")
.set("CREATE_INSTANT_INVITE", "Создавать приглашение")
.set("KICK_MEMBERS", "Выгонять участников")
.set("BAN_MEMBERS", "Банить участников")
.set("MANAGE_CHANNELS", "Управлять каналами")
.set("MANAGE_GUILD", "Управлять сервером")
.set("ADD_REACTIONS", "Добавлять реакции")
.set("VIEW_AUDIT_LOG", "Просматривать аудит")
.set("PRIORITY_SPEAKER", "Приоритетный режим")
.set("STREAM", "Стрим")
.set("VIEW_CHANNEL", "Просматривать канал")
.set("SEND_MESSAGES", "Отправлять сообщения")
.set("SEND_TTS_MESSAGES", "Отправлять Text-To-Speech сообщения")
.set("MANAGE_MESSAGES", "Управлять сообщениями")
.set("ATTACH_FILES", "Отправлять файлы")
.set("READ_MESSAGE_HISTORY", "Просматривать историю сообщений")
.set("MENTION_EVERYONE", "Упоминание `@everyone`, `@here`")
.set("USE_EXTERNAL_EMOJIS", "Использовать внешние эмодзи")
.set("VIEW_GUILD_INSIGHTS", "Просматривать аналитику сервера")
.set("CONNECT", "Подключаться")
.set("SPEAK", "Разговаривать")
.set("MUTE_MEMBERS", "Отключать участникам микрофон")
.set("DEAFEN_MEMBERS", "Отключать участникам звук")
.set("MOVE_MEMBERS", "Перемещать участников")
.set("USE_VAD", "Использовать режим активации по голосу")
.set("CHANGE_NICKNAME", "Изменять никнейм")
.set("MANAGE_NICKNAMES", "Управлять никнеймами")
.set("MANAGE_ROLES", "Управлять ролями")
.set("MANAGE_WEBHOOKS", "Управлять вебхуками")
.set("MANAGE_EMOJIS", "Управлять эмодзи")
.set("BOT_OWNER", "Создатель бота");

function permsToText(perms) {
    let result = [];
    for (const perm of perms) {
        result.push(permissions.get(perm));
    }
    return result;
}


/**
 * @param {Number} milliseconds
 */
function parseMS(milliseconds) {
    let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
    return {
        days: roundTowardsZero(milliseconds / 86400000),
        hours: roundTowardsZero(milliseconds / 3600000) % 24,
        minutes: roundTowardsZero(milliseconds / 60000) % 60,
        seconds: roundTowardsZero(milliseconds / 1000) % 60,
        milliseconds: roundTowardsZero(milliseconds) % 1000
    };
}

/**
 * @param {Number} first
 * @param {Number} second
 */
function getRandomInRange(first, second) {
    let min,max
    if(first>second) {
        min = second;
        max = first;
    } else {
        min = first;
        max = second;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function securitylevel(level) {
    if(!level || level == 0) {
        return "Все без исключений"
    } else {
        let needPerms = ""
        level.forEach(elem => {
            needPerms=needPerms + permissions.get(elem) + ", "
        });
        return `Нужные права: "${needPerms.slice(0, -1)}"`
    }
}

module.exports = {
    permsToText: permsToText,
    parseMS: parseMS,
    getRandomInRange: getRandomInRange,
    securitylevel: securitylevel
}
