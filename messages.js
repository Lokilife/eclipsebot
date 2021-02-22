const chalk = require("chalk");
const discord = require("discord.js");
const package = require("./package.json");

module.exports = {
    "en": {
        "welcome": chalk.yellow(
            `Welcome to Eclipse!
            Version: ${package.version}.
            Authors: [ElectroPlayer]#0256, Lokilife#7962.
            Node Version: ${process.version}.
            Discord.JS Version: ${discord.version}.`),
        "clientInitialization": {
            "start": chalk.cyan("[Initialization] Started initialization of client..."),
            "endSuccess": chalk.cyan("[Initialization] Client initialization successfully finished!"),
            "endFail": chalk.red("[Initialization] Client initialization failed!")
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
    }
}