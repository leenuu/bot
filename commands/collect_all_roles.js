const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {

    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
    
        var role_obj = msg.guild.roles.cache;
        var role_str = JSON.stringify(role_obj);
        var role_json = JSON.parse(role_str);
        var embed_str = "";

        for(var num in role_json) {
            var id = role_json[num]["id"];
            var name = role_json[num]["name"];
            embed_str += `${name} : ${id}\n`;
        }

        // console.log(datas.roles);

        const embed = new Discord.MessageEmbed()
            .setTitle("상점 품목")
            .setColor('0f4c81') 
            .setDescription(embed_str);
        await msg.reply({ embeds: [embed] });
    }

    catch(error) {
        
        if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
    }
    
};

exports.name = "모든역할id가져오기";
