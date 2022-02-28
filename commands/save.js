const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    
    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        datas.save()
        await msg.reply("저장완료.");
    }

    catch (error) {
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
    }
    
};

exports.name = "저장";