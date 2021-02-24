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
            message.channel.send(eval(code).toString());
        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
        }
    },
    "name": "eval",
    "aliases": ["eval"],
    "ownerOnly": true,
    "help": {
        "category": "Прочее",
        "desciption": "Просто eval, чё те ещё надо!?",
        "shortDescription": "Просто eval, чё те ещё надо!?",
        "usage": "eval <code>",
        "examples": [
            "eval message.channel.send(\"Примеров с этой командой может быть бесконечно много, обойдётесь одним\")"
        ],
    }
}