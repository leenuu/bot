const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    var img_url = datas.bot_config["management_help_img"];
    const embed = new Discord.MessageEmbed()
        .setTitle("관리도움")
        .setColor('0f4c81') 
        // .setDescription('관리도움 입니다.')
        .setImage(img_url);
    await msg.reply({ embeds: [embed] });
};

exports.name = "관리도움";