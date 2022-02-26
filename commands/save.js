const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    datas.save()
    msg.reply("저장완료.");
};

exports.name = "저장";