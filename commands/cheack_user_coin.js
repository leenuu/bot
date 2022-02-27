const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    try {
        var user = datas.change_id(args[0]);
        var coin = datas.cheack_coin(user);
        if (coin == -1) throw new Error(`user not found.`);
        await msg.reply(`${user}님의 코인수는 ${coin} 입니다`);
    } 

    catch (error) {
        await msg.reply(`존재하지 않는 유저입니다.`);
    }
    
};

exports.name = "유저코인확인";