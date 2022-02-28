const Discord = require('discord.js');

exports.run = async (client, msg, datas, args) => {

    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["normal_user_role_id"])) throw new Error('permission denied.');
        else if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');

        var user = `<@!${msg.author.id}>`;
        var goods = args[0];

        var status = datas.buy(user, goods);
        if (status == -1) throw new Error(`user not found.`);
        else if (status == -2) throw new Error(`not enough coin.`);
        else if (status == -3) throw new Error(`goods not found.`);

        await msg.reply(`${goods}를 구매하였습니다. 남은 코인 : ${datas.User_Data[user]["coin"] + datas.goods[goods]["price"]} -> ${datas.User_Data[user]["coin"]}`);

        if (datas.goods[goods]["content"] == "role")
        {
            var role = msg.guild.roles.cache.find(role => role.name === goods);
    
            if (role == undefined) throw new Error("role not found.")
            msg.member.roles.add(role);
            await msg.reply(`${user}님에게 ${role}을 지급하였습니다.`);    
        }

    }

    catch(error) {
        if (error.message == 'goods not found.') await msg.reply(`${goods}가 상품목록에 존재하지 않습니다.`);
        else if (error.message == 'goods not found.') await msg.reply(`${user}가 존재하지 않습니다.`);
        else if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        else if (error.message == 'not enough coin.') await msg.reply(`코인이 부족합니다.`);
        else await msg.reply("명령어가 틀렸습니다.");
    }
};

exports.name = "상품구매";