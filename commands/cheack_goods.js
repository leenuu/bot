const Discord = require('discord.js');

exports.run = (client, msg, datas ,args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("상점 품목")
        .setColor('0f4c81') 
        // .setDescription('상점 품목 입니다.')
        .setImage('https://i.imgur.com/wwVI352.jpg');
    msg.reply({ embeds: [embed] });
};

exports.name = "상점품목확인";