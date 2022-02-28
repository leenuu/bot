const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {

    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');

        var set = args[0];
        var content = args[1];

        var status = datas.edit_bot_config(set, content);
        if (status == -1) throw new Error(`${set} not found.`);
        await msg.reply(datas.cheack_bot_config());

    } 

    catch (error) {
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        else await msg.reply("명령어가 틀렸습니다.");
    }
};

exports.name = "설정변경";