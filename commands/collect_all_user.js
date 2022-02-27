const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {

    var role_obj = msg.guild.roles.cache;
    var role_str = JSON.stringify(role_obj);
    var role_json = JSON.parse(role_str);
    var embed_srt = ""

    for(var num in role_json) {
        var id = role_json[num]["id"];
        var name = role_json[num]["name"];

        embed_srt += `${name} : ${id}\n`;
    }

    const embed = new Discord.MessageEmbed()
    .setTitle("상점 품목")
    .setColor('0f4c81') 
    .setDescription(embed_srt);
    await msg.reply({ embeds: [embed] });

};

exports.name = "모든역할id가져오기";
