const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    var img_url = datas.bot_config["help_img"]
    const embed = new Discord.MessageEmbed()
        .setTitle("도움")
        .setColor('0f4c81') 
        // .setDescription('도움 입니다.')
        .setImage(img_url);
    msg.reply({ embeds: [embed] });
};

exports.name = "도움";