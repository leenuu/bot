const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    
    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        var user = datas.change_id(args[0]);
        var coin = datas.cheack_coin(user);
        if (coin == -1) throw new Error(`user not found.`);
        await msg.reply(`${user}님의 코인수는 ${coin} 입니다`);
    } 

    catch (error) {
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        else await msg.reply(`존재하지 않는 유저입니다.`);
    }
    
};

exports.name = "유저코인확인";