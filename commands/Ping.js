module.exports = {
    "run": async (message, client) => message.channel.send(`Pong! \`${client.ws.ping}\`ms`),
    "name": "ping",
    "aliases": ["ping", "пинг"],
    "help": {
        "category": "Общее",
        "desciption": "Задержки Discord API",
        "shortDescription": "Пинг",
        "usage": "ping",
        "examples": [
            "ping",
        ],
    }
}