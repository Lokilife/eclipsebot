const addlib = require('../addLib.js');

function testTail(tail, arr) {
    let ok = false;
    for(let i=0;i<=tail.length-1;i++) {
        if(tail[i][0] == arr[0] && tail[i][1] == arr[1]) {
            ok = true;
            break;
        }
    }
    return ok;
}

function newApple(head,tail) {
    let arr = [];
    for(let y=0;y<=12;y++) for(let x=0;x<=14;x++) {
        if(!((head[0] == x && head[1] == y) || testTail(tail, [x,y])) ) {
            arr.push([x,y]);
        }
    }
    if(arr.length==0) return false
    return arr[Math.floor(Math.random()*arr.length+1)]
}

function testClash(head, tail) {
    let ok = false;
    if(head[0]>14 || head[0]<0 || head[1]>12 || head[1]<0) ok = true;
    for(let i=0;i<=tail.length-1;i++) {
        if(head[0] == tail[i][0] && head[1] == tail[i][1]) {
            ok = true;
            break;}
    }
    return ok;
}

module.exports = {
    run: async (bot,message,args,con)=> {try{
        message.delete();

        let blackBlock = "⬛";
        let blueBlock  = "🟦";
        let redBlock   = "🟥";
        let boomBlock  = "💥";
        let appleBlock = "🍎";

        let heigth  = 12;
        let width   = 14;
        let alive   = true;
        let peace   = "";
        let score   = 0;

        let head    = [10,6];
        let tail    = [[11,6], [12,6], [13,6]];
        let apple   = await newApple(head,tail);

        let key     = "left";
        let curKey  = "left";

        let keys = {
            "⬅️":"left",
            "➡️":"right",
            "⬆️":"up",
            "⬇️":"down"
        }

        for(let y=0;y<=heigth;y++) {
            for(let x=0;x<=width;x++) {
                if(head[0] == x && head[1] == y) {
                    if(alive) peace = peace+redBlock;
                    else peace = peace+boomBlock;
                    continue;
                }
                else if(testTail(tail,[x,y])) {peace=peace+blueBlock;continue;}
                else if(apple[0] == x && apple[1] == y) {
                    peace=peace+appleBlock;
                    continue;
                }
                else {peace=peace+blackBlock;continue;}
            }
            peace = peace+"\n";
        }

        message.channel.send(con.defEmb.setTitle('Змейка').setDescription(`Очки: ${score}\n`+peace)).then(async msg => {
            await msg.react('⬅️');
            await msg.react('➡️');
            await msg.react('⬆️');
            await msg.react('⬇️');
            
            let filter = (reaction,user) => (reaction.emoji.name === '⬅️' || reaction.emoji.name === '⬆️' || reaction.emoji.name === '⬇️' || reaction.emoji.name === '➡️') && user.id === message.author.id;
            let collector  = msg.createReactionCollector(filter,{});

            collector.on('collect',(r) => {
                msg.reactions.cache.get(r.emoji.name).users.remove(message.client.users.cache.get(message.author.id));

                key = keys[r.emoji.name];
            });
            
            collector.on('end', async () => {
                try {
                    await msg.reactions.removeAll()
                } catch (error) {console.log(error)}
            })

            let intr = setInterval(()=>{
                //if(testClash(head,tail)) alive = false;
    
                if(!((curKey == "left" && key == "right")||(curKey == "right" && key == "left")||(curKey == "up" && key == "down")||(curKey == "down" && key == "up"))) curKey = key
                
                if        (curKey == "left") {
                    if(!testClash([head[0]-1,head[1]],tail)) {
                        if(!((head[0]-1) == apple[0] && head[1] == apple[1])) tail.splice(tail.length-1, 1);
                        tail.splice(0,0,head);
                        head = [head[0]-1,head[1]];
                    }
                    else alive = false;
                } else if (curKey == "up") {
                    if(!testClash([head[0],head[1]-1],tail)) {
                        if(!(head[0] == apple[0] && (head[1]-1) == apple[1])) tail.splice(tail.length-1, 1);
                        tail.splice(0,0,head);
                        head = [head[0],head[1]-1];
                    }
                    else alive = false;
                } else if (curKey == "right") {
                    if(!testClash([head[0]+1,head[1]],tail)) {
                        if(!((head[0]+1) == apple[0] && head[1] == apple[1])) tail.splice(tail.length-1, 1);
                        tail.splice(0,0,head);
                        head = [head[0]+1,head[1]];
                    }
                    else alive = false;
                } else if (curKey == "down") {
                    if(!testClash([head[0],head[1]+1],tail)) {
                        if(!(head[0] == apple[0] && (head[1]+1) == apple[1])) tail.splice(tail.length-1, 1);
                        tail.splice(0,0,head);
                        head = [head[0],head[1]+1];
                    }
                    else alive = false;
                }

                if(head[0] == apple[0] && head[1] == apple[1]) {
                    score++
                    apple = newApple(head,tail);
                    if(!apple) {
                        clearInterval(intr);
                        collector.stop();
                        msg.edit(con.defEmb.setTitle('Змейка').setDescription(`Очки: ${score} **ПОЗДРАВЛЯЮ С ПОБЕДОЙ!**\n`+peace))
                    }
                }
    
                peace = "";
                for(let y=0;y<=heigth;y++) {
                    for(let x=0;x<=width;x++) {
                        if(head[0] == x && head[1] == y) {
                            if(alive) peace = peace+redBlock;
                            else {
                                peace = peace+boomBlock;
                            }
                            continue;
                        }
                        else if(testTail(tail,[x,y])) {peace=peace+blueBlock;continue}
                        else if(apple[0] == x && apple[1] ==y) {peace=peace+appleBlock;continue}
                        else {peace=peace+blackBlock;continue}
                    }
                    peace = peace+"\n";

                    if(!alive) {
                        clearInterval(intr);
                        collector.stop();
                    }
                }

                msg.edit(con.defEmb.setTitle('Змейка').setDescription(`Очки: ${score}\n`+peace))
            },1250);
        })
    }catch(err){addlib.helps.commandError(bot,message,con,err)}},
    cmd: ["snake"],
    desc: "Змейка? (Чего блин?)",
    category: "Игры",
    helpEmbed: (con) => {
        return con.defEmb
        .addField('Аргументы:',`**Нет**`)
        .addField('Примеры:',`**${con.prefix}snake** - Начать играть`)
        .addField('Могут использовать:','Все без исключений',true)
    },
    show: true
}