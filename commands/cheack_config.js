const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    await msg.reply(datas.cheack_bot_config());
};

exports.name = "설정확인";