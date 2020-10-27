module.exports = {
    run: async (bot,message,args,con)=> {try{
        message.channel.send(con.defEmb.setTitle("Версия 0.0.0").setFooter(con.footer)
        .setDescription('Бот находится в разработке и версий пока что не имеет.\nНе все команды могут работать!'))
    }catch(err){console.log(err)}},
    cmd: ["version","ver"],
    desc: "Что изменилось в последней версии",
    category: "Общее"
}