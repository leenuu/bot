const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {

    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        var img_url = datas.bot_config["management_help_img"];
        const embed = new Discord.MessageEmbed()
            .setTitle("관리도움")
            .setColor('0f4c81') 
            // .setDescription('관리도움 입니다.')
            .setImage(img_url);
        await msg.reply({ embeds: [embed] });
        
    } 
    
    catch (error) {
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
    }

};

exports.name = "관리도움";