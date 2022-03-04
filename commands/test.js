const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("유저")
    .setDescription("유저 정보를 봅니다!")
    .addStringOption(option => option.setName('input').setDescription('Enter a string')),

  async execute(interaction) {
    // await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}` );
      await interaction.reply(interaction.options.getString('input'));
  },
};