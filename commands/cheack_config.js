const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    msg.reply(datas.cheack_bot_config());
};

exports.name = "설정확인";