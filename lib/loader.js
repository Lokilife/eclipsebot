const fs = require("fs");
const chalk = require("chalk");

function loadAll(path, client) {
    if (!fs.existsSync(path)) throw new Error(`Directory ${path} doesn't exists`);
    for (let file of fs.readdirSync(path, {withFileTypes: true})) {
        if (file.isFile() && file.name.endsWith(".js")) {
            const command = require(`${path}/${file.name}`);
            client.commands.push(command);
            console.log(chalk.green(`+ ${file.name}`));
        }
        if (file.isDirectory()) {
            loadAll(`${path}/${file.name}`);
        }
    }
}

module.exports = {
    loadAll: loadAll
}