const querystring = require('querystring');
const r2          = require('r2');
const addlib      = require('../addLib.js');

const CONFIG = require('../config.json')

//  https://thedogapi.com/signup

module.exports = {
    run: async (bot,message,args,con)=> {try{
    
        let images = await r2.get(`https://api.thedogapi.com/v1/images/search?${querystring.stringify({'has_breeds':true,'mime_types':'jpg,png','size':'small','sub_id': message.author.username,'limit' : 1})}` , {'X-API-KEY': CONFIG.apis.dog,} ).json;
        let image = images[0];

        message.channel.send(con.defEmb.setTitle("Собакен:").setImage(image.url).setFooter(con.footer));
    }catch(err){
        addlib.errors.unknow(message,"Код ошибки: " + err);
        bot.channels.cache.get(con.feedBackChannel).send(con.defEmb.setFooter(con.footer)
        .addField('Команда:', `${con.prefix}dog`)
        .addField('ID сервера:', message.guild.id, true)
        .addField('ID канала:', message.channel.id, true)
        .addField('ID сообщения:', message.id, true)
        .addField('Ошибка:', ` \`\`\`${err}\`\`\``)
        );
        console.log(err)
    }},
    cmd: "dog",
    desc: "Покажет рандомную собаку",
    category: "Картинки"
}