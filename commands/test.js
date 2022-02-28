const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    // try {
        var user_id = datas.change_id(args[0]).slice(3, -1)   ;
        // var tag = user;
        // console.log(typeof(tag));
        // console.log(tag);
        // console.log(user_id)
        var user = await client.users.fetch(user_id).catch(console.error);
        // console.log(user['username']);
        user = user['username']
        
        var embed = new MessageEmbed()
        .setColor('0x62c1cc')
        .setTitle("**"+user+"님이 항해 서버에 오셨어요!**\n다같이 환영해주세요!")
        .setDescription(user+"님\n<#867088900434558976>,  <#867088859669594122>와 <#926717715413090335>을 확인해주세요.");
        await msg.reply({embeds : [embed]});
    // } 
    // catch (error) {
    //     await msg.reply("명령어가 틀렸습니다.");
        
    // }
};

exports.name = "환영합니다";