const Discord    = require("discord.js");
const strftime   = require("strftime").localizeByIdentifier('ru_RU');
const addlib     = require("../addLib.js");

module.exports = {
    run: (bot,message,args,con)=> {try{
        if(args[0] == "help") {
            return message.channel.send(con.defEmb.setTitle("Помощь по команде profile").setDescription("Информация о человеке").setFooter(con.footer)
            .addField('Аргументы:',`**<user || автор>** - Покажет информацию о пользователе *(Можно ввести ID или имя)*`)
            .addField('Примеры:',`**${con.prefix}profile** - Покажет информацию о тебе\n**${con.prefix}profile @user** -  Покажет информацию об упомянутом пользователе\n**${con.prefix}profile 111111123456789101** - Покажет информацию о пользователе с таким ID\n**${con.prefix}profile UserName** - Покажет информацию о пользователе с таким именем *(НЕ НИКОМ НА СЕРВЕРЕ)*`)
            .addField('Сокращения:',`**${con.prefix}me**`)
            .addField('Могут использовать:','Все без исключений',true)
            .addField('Последнее обновление:',`Версия 1.0.0`,true)
            )
        }

        // Получаем пользователя, о котором мы ищем инфу
        let argsUser
        if(!args[0]) argsUser = message.author
        else {
            argsUser = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0]) || message.guild.members.cache.get(args[0]) //
            if(!argsUser) return addlib.errors.noUser(message);
            argsUser = message.guild.member(argsUser).user;
        }
        let member = message.guild.members.cache.get(argsUser.id) //  Находим человека на сервере
    
        //  Вычисляем все даты
        let day   = 1000 * 60 * 60 * 24
        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(argsUser.createdTimestamp)
        let date3 = new Date(message.guild.member(argsUser).joinedTimestamp)
        let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
        let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))

        let nickname   = member.nickname ? ` aka ${member.nickname}` : ""; //  Если есть никнейм, то мы его записываем, если нет, то его видно не будет
        let roles      = member.roles.cache.filter((r) => r.id !== message.guild.id) 
        .sort((a, b) => b.rawPosition - a.rawPosition)
        .map((r) => r).join(", ") || "Отсутствуют"; //  Если роли есть, у нас будет весь список, если нет, то напишет "Отсутствуют"

        let roleCount = member.roles.cache.filter((r) => r.id !== message.guild.id).size; //  Находим количество ролей
    
        let profileEmbed = new Discord.MessageEmbed().setTitle(argsUser.username + nickname).setColor(con.color) 
        .addField('Дата регистрации:', `${strftime('%B %d, %Y год в %H:%M', date2)}\n(${diff1} дней назад)`,true)
        .addField('Подключился на сервер:', `${strftime('%B %d, %Y год в %H:%M', date3)}\n(${diff2} дней назад)`,true)
        .addField(`ID:`,`${argsUser.id}`)
        .addField(`Роли (${roleCount}):`, `${roles}`)
        .setThumbnail(argsUser.avatarURL({ dynamic: true, size: 512 })|| argsUser.defaultAvatarURL)
        .setFooter(con.footer); //  Создаём embed. Создал его сразу для своего удобства, потом не придётся писать это снова

        let statuses = {online: `В сети`, idle: `Не активен`, dnd: `Не беспокоить`, offline: `Не в сети`} //  Облегчаем себе жизнь
        let game
        if(message.guild.presences.cache.get(argsUser.id)) {
            game = `\`\`\`${statuses[message.guild.presences.cache.get(argsUser.id).status]}\`\`\``; //  Вычисляем в сети ли он или нет
            if(game == `\`\`\`Не в сети\`\`\``) return; //  Если нет, то на этом заканчиваем
        } else return message.channel.send(profileEmbed.addField(`Имеет статус:`, `\`\`\`${statuses[argsUser.presence.status]}\`\`\``)) //  Если у нас нет его персистенсов, то заканчиваем тоже
    
        let text = `` //  Узнаем, откуда он активен
        if(message.guild.presences.cache.get(argsUser.id).clientStatus.web) text = text + `Браузера\n`
        if(message.guild.presences.cache.get(argsUser.id).clientStatus.mobile) text = text + `Телефона\n`
        if(message.guild.presences.cache.get(argsUser.id).clientStatus.desktop) text = text + `Компьютера\n`
    
        let activit  = message.guild.presences.cache.get(argsUser.id).activities; //  Да, я умею называть переменные)
        let activ    = '';
    
        for(let i=0;i<=activit.length-1;i++) {  //  Там без цикла никак...
            if (activit[i].type == 'CUSTOM_STATUS') { //  К кастомному статусу отдельная надпись
                activ = activ + ` \`\`\`Кастомный статус: ${activit[i].state}\`\`\` `
            } else {
                activ = activ + ` \`\`\`Имя: ${activit[i].name}\n${activit[i].details}\n${activit[i].state}\`\`\` `
            }
        } //  Иногда какой-то из параметров может быть null. К сожалению, я ещё не отследил, какой, когда, как и почему...
    
        if(activ == '') activ = '```Нет```' //  Если активностей нет, то и сюда нет...

        message.channel.send(profileEmbed.addField(`Активен с`,`\`\`\`${text}\`\`\``).addField(`Активности:`, activ)) //  Откправляем конечный embed
        

    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}profile`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["profile","me"],
    desc: "Информация о человеке",
    category: "Прочее",
    show: true
}