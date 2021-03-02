const fs       = require("fs");
//const chalk    = require("chalk"); //  На хер, если не используется?
const messages = require("../messages").en;

function loadCommands(path, client) {
    for (let file of fs.readdirSync(path, {withFileTypes: true})) {
        if (file.isFile() && file.name.endsWith(".js")) {
            try {
                const command = require(`${path}/${file.name}`);
                client.commands.push(command);
                console.log(messages.commandsLoader.commandLoaded(file.name));
            } catch (e) {
                console.log(messages.commandsLoader.commandLoadingFailed(file.name, e));
            }
        }
        if (file.isDirectory())
            loadCommands(`${path}/${file.name}`);
    }
}

function loadListeners(path, client) {
    for (let file of fs.readdirSync(path, {withFileTypes: true})) {
        if (file.isFile() && file.name.endsWith(".js")) {
            try {
                const listeners = require(`${path}/${file.name}`);
                if (listeners instanceof Array) 
                    for (const listener of listeners)
                        client.on(listener.name, listener.run.bind(null, client)); 
                else        
                    client.on(listeners.name, listeners.run.bind(null, client));
                
                console.log(messages.listenersLoader.listenerLoaded(file.name));
            } catch (e) {
                console.log(messages.listenersLoader.listenerLoadingFailed(file.name, e));
            }
        }
        if (file.isDirectory())
            loadListeners(`${path}/${file.name}`);
    }
}

module.exports = {
    loadCommands: loadCommands,
    loadListeners: loadListeners
}