const chalk = require("chalk");
const discord = require("discord.js");
const package = require("./package.json");

module.exports = {
    "en": {
        "welcome": chalk.yellow(
            `Welcome to Eclipse!
            Version: ${package.version}.
            Authors: [ElectroPlayer]#0256, Lokilife#7962.
            Node.JS Version: ${process.version}.
            Discord.JS Version: ${discord.version}.`),
        "clientInitialization": {
            "start": chalk.cyan("[Initialization] Started initialization of client..."),
            "endSuccess": chalk.cyan("[Initialization] Client initialization successfully finished!"),
            "endFail": chalk.red("[Initialization] Client initialization failed!")
        },
        "listenersLoader": {
            "start": chalk.cyan("[ListenersLoader] Initialized loading of listeners..."),
            "endSuccess": chalk.cyan("[ListenersLoader]] All listeners successfully loaded!"),
            "endFail": chalk.cyan("[ListenersLoader] The listeners are loaded with some fails."),
            "listenerLoaded": (listenerName) => chalk.green(`+ ${listenerName}`),
            "listenerLoadingFailed": (listenerName, err) => chalk.red(`Failed to load listener ${listenerName}\nError: ${err}`)
        },
        "commandsLoader": {
            "start": chalk.cyan("[CommandsLoader] Initialized loading of commands..."),
            "endSuccess": chalk.cyan("[CommandsLoader] All commands successfully loaded!"),
            "endFail": chalk.cyan("[CommandsLoader] The commands are loaded with some fails."),
            "commandLoaded": (commandName) => chalk.green(`+ ${commandName}`),
            "commandLoadingFailed": (commandName, err) => chalk.red(`Failed to load command ${commandName}\nError: ${err}`)
        },
        "client": {
            "start": chalk.green("[Client] Client started!")
        }
    },
    "ru": {
        "welcome": chalk.yellow(
            `Добро пожаловать в Eclipse!
            Версия: ${package.version}.
            Разработчики: [ElectroPlayer]#0256, Lokilife#7962.
            Версия Node.JS: ${process.version}.
            Версия Discord.JS: ${discord.version}.`),
        "clientInitialization": {
            "start": chalk.cyan("[Инициализация] Началась инициализация клиента..."),
            "endSuccess": chalk.cyan("[Инициализация] Инициализация клиента успешно завершена!"),
            "endFail": chalk.red("[Инициализация] Инициализация клиента не удалась!")
        },
        "listenersLoader": {
            "start": chalk.cyan("[Загрузчик Событий] Инициализирована загрузка событий..."),
            "endSuccess": chalk.cyan("[Загрузчик Событий] Все события успешно загружены!"),
            "endFail": chalk.cyan("[Загрузчик Событий] События загружены с некоторыми сбоями."),
            "listenerLoaded": (listenerName) => chalk.green(`+ ${listenerName}`),
            "listenerLoadingFailed": (listenerName, err) => chalk.red(`Не удалось загрузить событие ${listenerName}\nОшибка: ${err}`)
        },
        "commandsLoader": {
            "start": chalk.cyan("[Загрузчик Команд] Инициализирована загрузка команд..."),
            "endSuccess": chalk.cyan("[Загрузчик Команд] Все команды успешно загружены!"),
            "endFail": chalk.cyan("[Загрузчик Команд] Команды загружены с некоторыми сбоями."),
            "commandLoaded": (commandName) => chalk.green(`+ ${commandName}`),
            "commandLoadingFailed": (commandName, err) => chalk.red(`Не удалось загрузить команду ${commandName}\nОшибка: ${err}`)
        },
        "client": {
            "start": chalk.green("[Клиент] Клиент запущен!")
        }
    }
}