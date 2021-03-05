/// <reference path="../typings/index.d.ts">
/**
 * Класс команды, значительная часть бота
 * без которой команды не будут работать.
 */
module.exports = class Command {
    /**
     * @param {CommandOptions} options
     */
    constructor(options= {}) {
        /**
         * Функция которая выполняется при вызове команды.
         * @type {Function}
         */
        this.run = options.exec;
        /**
         * Имена на которые реагирует бот.
         * @type {string[]}
         */
        this.aliases = options.aliases;
        /**
         * Могут ли команду использовать только владелец(ы).
         * @type {boolean}
         */
        this.ownerOnly = options.ownerOnly;
        /**
         * Права бота необходимые для команды
         * @type {Permissions}
         */
        this.botPermissions = new Permissions(options.botPermissions);
        /**
         * Права пользователя необходимые для команды
         * @type {Permissions}
         */
        this.userPermissions = new Permissions(options.userPermissions);
        /**
         * Объект Help который используется в команде
         * help для отображения информации о команде.
         * @type {HelpResolvable}
         */
        this.help = options.help;
    }
}