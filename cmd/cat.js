const querystring = require('querystring');
const r2          = require('r2');

const CONFIG = require('../config.json')

// https://thedogapi.com/signup

module.exports = {
    run: async (bot,message,args,con)=> {try{
    
        let images = await r2.get(`https://api.thecatapi.com/v1/images/search?${querystring.stringify({'has_breeds':true,'mime_types':'jpg,png','size':'small','sub_id': message.author.username,'limit' : 1})}` , {'X-API-KEY': CONFIG.apis.cat,} ).json;
        let image = images[0];

        message.channel.send(con.defEmb.setTitle("Котэ:").setImage(image.url).setFooter(con.footer));
    }catch(err){console.log(err)}},
    cmd: "cat",
    desc: "Покажет рандомного кота",
    category: "Картинки"
}
