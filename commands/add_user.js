const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    try{
        var user = `<@!${msg.author.id}>`
        var status = datas.add_user(user)
        if (status == -1) throw new Error(`${user} is not new user.`)
        msg.reply("만들었습니다.");
    }

    catch(error){
        msg.reply("이미 있습니다.");
    }
    
};

exports.name = "만들기";