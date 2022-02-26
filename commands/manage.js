const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    try{
        var user = args[0];
        var coin = args[1];
        if (isNaN(coin)) throw new Error("not int")
        coin = parseInt(coin)
        var user_coin = datas.User_Data[user]['coin']
        datas.manage(user, coin);
        msg.reply(`${user}님의 코인을 ${coin} 만큼 변경하였습니다. 잔액 : ${user_coin} -> ${user_coin + coin}.`);
    }

    catch(error){
        msg.reply("명령어가 틀렸습니다.");
    }
    
};

exports.name = "코인지급";
