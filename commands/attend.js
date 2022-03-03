const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    
    try{
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["normal_user_role_id"])) throw new Error('permission denied.');
        else if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        var user = `<@!${msg.author.id}>`;
        var status = datas.attend(user);
        var attend_count = datas.User_Data[user]["att_count"];  
        if (status == -1) throw new Error(`not found.`);
        if (status == -2) throw new Error(`have already attended.`);
        await msg.reply(`출석체크 완료. ${datas.attend_coin}코인이 추가 되었습니다. 출석횟수 : ${attend_count}`);
    }

    catch(error){
        if (error.message == `have already attended.`) await msg.reply("이미 출석 하셨습니다.");
        else if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        else await msg.reply("명령어가 틀렸습니다.");
    }
    
};

exports.name = "출석체크";