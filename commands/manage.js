const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    try{
        var user = args[0];
        var coin = args[1];
        if (isNaN(coin)) throw new Error("not int")
        coin = parseInt(coin)
        var user_coin = datas.User_Data[user]['coin']
        var status = datas.manage(user, coin);
        console.log(status)
        if (status == -1) throw new Error('else error')
        if (status == -2) throw new Error(`not enough coin.`)
        msg.reply(`${user}님의 코인을 ${coin} 만큼 변경하였습니다. 잔액 : ${user_coin} -> ${user_coin + coin}.`);
    }

    catch(error){
        // console.log(error.message)
        if (error.message == "not int") msg.reply("코인수가 틀렸습니다.");
        else if (error.message == `not enough coin.`) msg.reply("코안이 부족합니다.");
        else msg.reply("명령어가 틀렸습니다.");
    }
    
};

exports.name = "코인지급";
