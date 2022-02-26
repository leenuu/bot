const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    var user = args[0]
    var coin = datas.cheack_coin(user)
    msg.reply(`${user}님의 코인수는 ${coin} 입니다`);
};

exports.name = "유저코인확인";