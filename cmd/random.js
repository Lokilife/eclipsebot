const addlib   = require('../addLib.js');

function getRandomInRange(first, second) {
    let min,max
    if(first>second) {
        min = second;
        max = first;
    } else {
        min = first;
        max = second;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    run: (bot,message,args,con)=> {try{

        if(!args[0]) return addlib.errors.notArgs(message, `Напиши **${con.prefix}help random** для помощи по команде`)

        switch (args[0]) {
            case "word":
                if(!args[1] || !args[2]) return addlib.errors.notArgs(message,"А из чего выбирать?")

                message.channel.send(con.defEmb.setTitle(`${args[(Math.floor( Math.random() * (args.length-1) )+1)]}`))
            break;

            case "number":
                if(!args[1]) return addlib.errors.notArgs(message);

                if(args[1] && !args[2]) {
                    if(!/^[-]?\d+$/.test(args[1])) return addlib.errors.falseArgs(message, "Разрешены только числа!")
                    if(args[1]>999999 || args[1]<-999999) return addlib.errors.falseArgs(message, "Число не должно быть больше 999999")
                    message.channel.send(con.defEmb.setTitle(`${Math.floor(Math.random() * args[1])}`))
                }
                else if(args[1] && args[2]) {
                    if(!/^[-]?\d+$/.test(args[1])||!/^[-]?\d+$/.test(args[2])) return addlib.errors.falseArgs(message, "Разрешены только числа!")
                    if(args[1]>999999 || args[1]<-999999 || args[2]<-999999 || args[2]>999999) return addlib.errors.falseArgs(message, "Число не должно быть больше 999999");
                    if(args[1]==args[2]) return message.channel.send(con.defEmb.setTitle(`${args[1]}`))
                    message.channel.send(con.defEmb.setTitle(`${getRandomInRange(Number(args[1]), Number(args[2]))}`))
                } else return addlib.errors.unknow(message);

            break;

            case "user":
                message.channel.send(con.defEmb.setTitle(`${message.guild.members.cache.random().user.tag}`))
            break;

            case "color":
                // eslint-disable-next-line no-case-declarations
                let color = '#'
                for (var i = 0; i < 6; i++) {
                    color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
                }
                message.channel.send(con.defEmb.setColor(color).setTitle(`Случайный цвет:`).setDescription(color))
            break;

            default:
                addlib.errors.falseArgs(message)
            break;

        }
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["random","rand"],
    desc: "Рандомайзер",
    category: "Прочее",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**word <Слова из которых нужно выбрать>** - Выберет рандомное слово из заданных\n**number <x>** - Выберет рандомное число от 0 до x\n**number <x> <y>** - Выберет рандомное число от x до y\n**user** - Рандомный человек с сервера\n**color** - Рандомный цвет\n\n`)
        .addField('Примеры:',`**${con.prefix}random word Кошка Кошечка Киска** - Выберет рандомное слово из предложенных\n**${con.prefix}random number 10** -  Рандомное число от 0 до 10\n**${con.prefix}random number 5 10** -  Рандомное число от 5 до 10\n**${con.prefix}random user** - Выберет рандомного человека\n**${con.prefix}random color** - Даст рандомный цвет`)
        .addField('Сокращения:',`**${con.prefix}rand**`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}