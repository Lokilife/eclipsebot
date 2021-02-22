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
            const result = eval(code);
            message.channel.send(result.toString());
        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\`\`\``);
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