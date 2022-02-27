const Discord = require('discord.js');

exports.run = async (client, msg, datas ,args) => {
    var img_url = datas.bot_config["goods_img"];
    const embed = new Discord.MessageEmbed()
        .setTitle("상점 품목")
        .setColor('0f4c81') 
        // .setDescription('상점 품목 입니다.')
        .setImage(img_url);
    await msg.reply({ embeds: [embed] });
};

exports.name = "상점품목확인";