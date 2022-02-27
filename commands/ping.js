const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    await msg.reply(`${client.ws.ping}ms`);
};

exports.name = "ping";

