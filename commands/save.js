const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    datas.save()
    await msg.reply("저장완료.");
};

exports.name = "저장";