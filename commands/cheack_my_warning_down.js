const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    try {
        var user = `<@!${msg.author.id}>`;
        var warning_down = datas.cheack_warning_down(user);
        if (warning_down == -1) throw new Error(`user not found.`);
        await msg.reply(`${user}님의 경고차감권수는 ${warning_down} 입니다`);
    } 

    catch (error) {
        await msg.reply(`존재하지 않는 유저입니다.`);
    }
};

exports.name = "경고차감권확인";