const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test command")
    .addStringOption(option => option.setName('input').setDescription('test')),

  async execute(interaction, datas) {
    // await interaction.reply(`${interaction.options.getString('input')}`);
      // await interaction.reply();
      // await interaction.reply();
      console.log(interaction.member)
  },
};