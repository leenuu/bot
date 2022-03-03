const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    
    try{
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');

        var user = datas.change_id(args[0]);
        var count = args[1];
        if (isNaN(count)) throw new Error("not int");
        count = parseInt(count);
        var warning_down = datas.User_Data[user]['warning_down'];
        var status = datas.manage_warning_down(user, count);
        // console.log(status)
        if (status == -1) throw new Error('else error');
        if (status == -2) throw new Error(`not enough warning_down.`);
        await msg.reply(`${user}님의 경고차감권을 ${count} 만큼 변경하였습니다. 남은 경고차감권 : ${warning_down} -> ${warning_down + count}.`);
    }

    catch(error){
        // console.log(error.message)
        if (error.message == "not int") await msg.reply("경고차감권수가 틀렸습니다.");
        else if (error.message == `not enough warning_down.`) await msg.reply("경고차감권이 부족합니다.");
        else if (error.message == 'not found.') await msg.reply(`${goods}가 상품목록에 존재하지 않습니다.`);
        else if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        else await msg.reply("명령어가 틀렸습니다.");
    }
    
};

exports.name = "경고차감권지급";
