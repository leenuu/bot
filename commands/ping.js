const Discord = require('discord.js');

exports.run = async (client, msg, args) => {

    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        await msg.reply(`${client.ws.ping}ms`);
    }

    catch (error) {
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
    }
    
};

exports.name = "ping";

