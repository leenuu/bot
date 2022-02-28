const Discord = require('discord.js');

exports.run = async (client, msg, datas, args) => {

    try {
        
        var user = args[0];
        var role = msg.guild.roles.cache.find(role => role.name === args[1]);
        var member = msg.mentions.members.first();

        if (role == undefined) throw new Error("role not found.")
        member.roles.add(role);
        await msg.reply(`${user}님에게 ${role}을 지급하였습니다.`);    
    }

    catch(error){
        if (error.message == "role not found.") await msg.reply("가격이 틀렸습니다.");
        else 
        {
            await msg.reply("명령어가 틀렸습니다.");
            console.log(error);
        }
    }
};

exports.name = "역활추가";