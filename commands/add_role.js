// const { SlashCommandBuilder } = require("@discordjs/builders");

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName("역활추가")
//     .setDescription("유저한테 역활을 추가합니다!")
//     .addStringOption(option => option.setName('유져 맨션').setDescription('유져 맨션'))
//     .addStringOption(option => option.setName('역활이름').setDescription('역활이름')),

//   async execute(interaction, datas) {
//     // try {
//     //     // if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
//     //     var user = interaction.options.getString('유져 맨션');
//     //     var role = interaction.options.getString('역활이름');
//     //     var member = interaction.member;

//     //     // if (role == undefined) throw new Error("role not found.")
//     //     member.roles.add(role);
//     //     await interaction.reply(`${user}님에게 ${role}을 지급하였습니다.`);    
//     // }

//     // catch(error){
//     //     if (error.message == "role not found.") await interaction.reply("가격이 틀렸습니다.");
//     //     else if (error.message == 'permission denied.') await interaction.reply(`권한이 없습니다.`);
//     //     else await msg.reply("명령어가 틀렸습니다.");
//     //     // console.log(error.message);
        
//     // }
//   },
// };

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("역활추가")
    .setDescription("test command")
    .addStringOption(option => option.setName('유저맨션').setDescription('유저맨션'))
    .addStringOption(option => option.setName('역활이름').setDescription('역활이름')),

  async execute(interaction, client, datas) {
    try {
        // if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        var user = interaction.options.getString('유저맨션');
        if(user.indexOf('@') != -1)
          var user_id = user.slice(3,-1);
        else
          var user_id = user.slice(2,-1);
        var role_name = interaction.options.getString('역활이름');
        let member = client.users.cache.find(user => user.id === user_id)
        let role = interaction.guild.roles.cache.find(role => role.name === role_name);
        
        console.log(interaction);
        // if (role == undefined) throw new Error("role not found.")
        console.log(member);
        console.log(user, user_id, role_name, member.roles);
        //  member.roles(role);
        await interaction.reply(`${user}님에게 ${role}을 지급하였습니다.`);    
    }

    catch(error){
        if (error.message == "role not found.") await interaction.reply("가격이 틀렸습니다.");
        else if (error.message == 'permission denied.') await interaction.reply(`권한이 없습니다.`);
        else await interaction.reply("명령어가 틀렸습니다.");
        console.log(error.message);
        
    }
  },
};

