const addlib = require('../addLib.js'); //  Моя либа)
module.exports = {
    run: async (bot,message,args,con)=> {try{
        //  Сюда пишешь свой код, желательно с комментариями, но можно и без них)
        /*
        Что такое con? Это целый объект со всякими полезностями!
        {
            "cmds" - Список всех команд, а точнее массив, с каждой командой и её описанием!,
            "prefix" - Префикс,
            "color" - Цвет,
            "defEmb" - Дефолтный ембед с установленным цветом,
            "footer" - Дефолтный футер,
            "categories" - Все существующие категории,
            "feedBackChannel" - ИД канала для фидбэков,
            "cmd" - Текущая команда
        }
        con может как вообще не пригдиться, так и пригодиться основательно.
        Это как кладовка, в которой куча всякого мусора, про который ты думаешь "Нах оно мне нужно?",
        А потом в один прекрасный момент тебе какая-то вещь резко нужна и без неё ты продолжения своей жизни не знаешь...
        */
    }catch(err){ //  Если возник ушиб очка, то это отправит всё в консоль и в канал
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}template`) //  Сюда пишешь название команды
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: ["template"], //  Сюда все е алиасы. Первый желательно главный
    desc: "Шаблон", //  Описание
    category: "Общее", //  Категория
    helpEmbed: (con) => { //  embed помощи по команде. По help <команда> появится этот embed.
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}server** - Версия бота и что нового`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: false  //  true - Показывать в команде help | false - не показывать
}