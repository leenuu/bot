const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    try {
        var set = args[0];
        var content = args[1];

        var status = datas.edit_bot_config(set, content);
        if (status == -1) throw new Error(`${set} not found.`);
        await msg.reply(datas.cheack_bot_config());

    } 

    catch (error) {
        await msg.reply("명령어가 틀렸습니다.");
    }
};

exports.name = "설정변경";