const discord = require('discord.js');
const colors  = require('./colors.json');
module.exports.errors = {
    notArgs: (message,desc) => {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle('Недостаточно аргументов!');
        if(desc) emb.setDescription(desc);
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
    falseArgs: (message,desc) => {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle('Предоставлены неверные аргументы!');
        if(desc) emb.setDescription(desc);
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
    notPerms: (message) => {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle('У тебя недостаточно прав!');
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
    botNotPerms: (message) => {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle('У меня недостаточно прав!');
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
    noUser: (message)=> {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle('Такого пользователя не существует!');
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
    noChannel: (message)=> {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle('Такого канала не существует!');
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
    castom: (message,title,desc) => {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle(title);
        if(desc) emb.setDescription(desc);
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
    success: (message,title,desc) => {
        let emb = new discord.MessageEmbed().setColor(colors.successGreen).setTitle(title);
        if(desc) emb.setDescription(desc);
        message.channel.send(emb);
    },
    APIErrors: (message) => {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle('Неполадки с API! Попробуйте позже...');
        message.channel.send(emb);
    },
    unknow: (message,desc) => {
        let emb = new discord.MessageEmbed().setColor(colors.errorRed).setTitle("Произошла неизвестная ошибка");
        if(desc) emb.setDescription(desc);
        message.channel.send(emb).then(msg=>msg.delete({timeout:5000}));
    },
}
