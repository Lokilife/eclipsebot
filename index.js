//  Дароу
const discord  = require('discord.js');
//const ms        = require('ms');
//const strftime  = require('strftime');
//const fs        = require('fs');
//const mongoose  = require('mongoose');

//  Подключение файлов
const CONFIG = require('./config.json');

//  Константы
const bot = new discord.Client();

//  Переменные
let prefix = "e."

bot.login(CONFIG.token); //  Логиним бота

bot.on("ready", () => {
    console.log('Готов!');
});

bot.on("message", async (message) => {
    if(message.content.startsWith(prefix + "help")) message.channel.send('Не знаю, чем тебе помочь')
});