module.exports = {
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @param {Array<String>} args 
     */
    "run": async function (message, client, args) {
        const code = args.join(" ").replace(/(```(\w+)?)/g, "").trim();
        try {
            message.channel.send(eval(code));
        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
        }
    },
    "name": "eval",
    "aliases": ["eval"],
    "ownerOnly": true,
    "help": {
        "category": "Owners",
        "description": "Просто eval, чё те ещё надо!?",
        "arguments": `Запрещено!`,
        "usage": `Запрещено!`,
        "usageLevel": ["BOT_OWNER"]
    }
}