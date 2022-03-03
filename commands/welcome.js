const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg, datas ,args) => {

    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        var arr = new Array();
        
        for (var i = 0; i<args.length; i++){
            var user_id = datas.change_id(args[i]).slice(3, -1);
            var user = await client.users.fetch(user_id).catch(console.error);
             
            arr[i] = user['username'];
        }
        
        var embed = new MessageEmbed()
        .setColor('0x62c1cc')
        .setTitle("**"+arr.join('님, ')+"님이 항해 서버에 오셨어요!**\n다같이 환영해주세요!")
        .setDescription(args.join('님, ')+"님\n<#867088900434558976>,  <#867088859669594122>와 <#926717715413090335>을 확인해주세요.");
        await msg.channel.send("@here");
        await msg.channel.send({embeds : [embed]});
    } 
    catch (error) {
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        else await msg.reply("명령어가 틀렸습니다.");
    }
};

exports.name = "환영합니다";