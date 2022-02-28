const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {

    try {
        
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');   
        var user = `<@!${msg.author.id}>`;
        var status = datas.add_user(user);
        if (status == -1) throw new Error(`${user} is not new user.`);
        await msg.reply("만들었습니다.");
    }

    catch(error){
        await msg.reply("이미 있습니다.");
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
    }
    
};

exports.name = "만들기";
