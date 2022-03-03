const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    
    try{
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');

        var user = datas.change_id(args[0]);
        var coin = args[1];
        if (isNaN(coin)) throw new Error("not int");
        coin = parseInt(coin);
        var user_coin = datas.User_Data[user]['coin'];
        var status = datas.manage(user, coin);
        // console.log(status);
        if (status == -1) throw new Error('else error');
        if (status == -2) throw new Error(`not enough coin.`);
        await msg.reply(`${user}님의 코인을 ${coin} 만큼 변경하였습니다. 잔액 : ${user_coin} -> ${user_coin + coin}.`);
    }

    catch(error){
        // console.log(error.message)
        if (error.message == "not int") await msg.reply("코인수가 틀렸습니다.");
        else if (error.message == `not enough coin.`) await msg.reply("코인이 부족합니다.");
        else if (error.message == 'not found.') await msg.reply(`${goods}가 상품목록에 존재하지 않습니다.`);
        else if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        else await msg.reply("명령어가 틀렸습니다.");
    }
    
};

exports.name = "코인지급";
