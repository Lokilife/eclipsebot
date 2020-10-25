module.exports = {
    run: (bot,message,args,con)=> {try{
        if(args[0] == "help") {
            return message.channel.send(con.defEmb.setTitle("Тебе серьёзно нужна помощь по этой команде?").setDescription("Мне лень)").setFooter(con.footer))
        }

        let botembed = con.defEmb
        .setTitle("Информация о боте!")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField(`Описание:`, `Ночью на много лучше работает воображение, но ночью, обычно, люди спят. Во время затмения люди не спят, а воображение работает как ночью. В одно из таких затмений, в полёте фантазий, появился я... Eclipse...`)
        .addField(`Состав Night Devs:`,`**Разработчики:**\nElectroplayer#0256\nTegnio#6882`)
        .addField(`Связь:`,`[Наш сервер в Discord с новостями](https://discord.gg/jUUVqYj)\n[Репозиторий в GitHub](https://github.com/Elektroplayer/eclipsebot)`)
        .setFooter(con.footer)
        message.channel.send(botembed);
    }catch(err){console.log(err)}},
    cmd: "info",
    desc: "Информация о боте",
    category: "Общее"
}