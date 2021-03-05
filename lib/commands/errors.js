/**
 * @type {Map<PermissionResolvable, String>}
 */
const permsMap = new Map()
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
    .set("MANAGE_EMOJIS", "Управлять эмодзи");

/**
 * Начало иерарзии классов ошибок команд.
 * Запрещено использовать кроме как создания ошибок.
 * Кто запрещает? Я!
 */
class CommandError extends Error {
    /**
     * @param {string} error Текст ошибки
     * @param {Message} message Сообщение которое вызывало ошибку
     * @param {GuildMember | User} author Автор сообщения
     */
    constructor(error, message, author) {
        super(error);
        /**
         * Сообщение которое вызвало ошибку.
         * @type {Message}
         */
        this.message = message;
        /**
         * Канал в котором была вызвана ошибка.
         * @type {TextChannel}
         */
        this.channel = message.channel;
        /**
         * Автор сообщения.
         * @type {GuildMember | User}
         */
        this.author = author;
    }
}

/**
 * Ошибка вызываемая когда человек пытается использовать
 * ownerOnly команду, но он не является владельцем бота.
 * @type {NotOwner}
 */
class NotOwner extends CommandError {}

/**
 * Ошибка вызываемая когда в команде происходит неизвестная ошибка
 * которую ничто не отлавливает.
 * @type {UnknownError}
 */
class UnknownError extends CommandError {
    /**
     * @param {string} error Текст ошибки
     * @param {Message} message Сообщение которое вызывало ошибку
     * @param {GuildMember | User} author Автор сообщения
     */
    constructor(error, message, author) {
        super(error, message, author);
        /**
         * Текст ошибки
         * @type {string}
         */
        this.error = error;
    }
}

/**
 * Ошибка вызываемая когда у человека отсутствуют права
 * чтобы использовать эту команду.
 * @type {MissingPermissions}
 */
class MissingPermissions extends CommandError {
    /**
     * @param {string} error Текст ошибки
     * @param {Message} message Сообщение вызвавшее ошибку
     * @param {GuildMember} author Автор сообщения
     * @param {PermissionResolvable} permissions Отсутствующие права
     */
    constructor(error, message, author, permissions) {
        super(error, message, author);
        /**
         * Отсутствующие права
         * @type {PermissionResolvable}
         */
        this.permissions = permissions;
    }

    /**
     * Превращает массив прав из формата 'MANAGE_MESSAGES'
     * в 'Управление Сообщениями'.
     * @returns {Array<String>}
     */
    permsToRussian() {
        let result = [];
        for (const permission of this.permissions)
            result.push(permsMap.get(permission));
        return result;
    }
}

/**
 * Ошибка вызываемая когда у бота отсутствуют права
 * чтобы вызывать эту команду.
 * @type {BotMissingPermissions}
 */
class BotMissingPermissions extends CommandError {
    /**
     * @param {string} error Текст ошибки
     * @param {Message} message Сообщение вызвавшее ошибку
     * @param {GuildMember} author Автор сообщения
     * @param {PermissionResolvable} permissions Отсутствующие права
     */
    constructor(error, message, author, permissions) {
        super(error, message, author);
        /**
         * Отсутствующие права
         * @type {PermissionResolvable}
         */
        this.permissions = permissions;
    }

    /**
     * Превращает массив прав из формата 'MANAGE_MESSAGES'
     * в 'Управление Сообщениями'.
     * @returns {Array<String>}
     */
    permsToRussian() {
        let result = [];
        for (const permission of this.permissions)
            result.push(permsMap.get(permission));
        return result;
    }
}

module.exports.CommandError = CommandError;
module.exports.NotOwner = NotOwner;
module.exports.UnknownError = UnknownError;
module.exports.MissingPermissions = MissingPermissions;
module.exports.BotMissingPermissions = BotMissingPermissions;