const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("상품추가")
    .setDescription("상품을 추가 합니다.")
    .addStringOption(option => option.setName('상품이름').setDescription('상품이름'))
    .addStringOption(option => option.setName('상품종류').setDescription('상품종류'))
    .addIntegerOption(option => option.setName('상품가격').setDescription('상품가격')),

  async execute(interaction) {
      try {
        // if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');
        // datas.save()
        var new_goods = interaction.options.getString('상품이름');
        var new_goods_price = interaction.options.getString('상품가격');
        var new_goods_content = interaction.options.getString('상품종류');
        // if (isNaN(new_goods_price)) throw new Error("not int");
        new_goods_price = parseInt(new_goods_price);
    
        // datas.add_goods(new_goods, new_goods_price,new_goods_content);
        await interaction.reply(`${new_goods}(${new_goods_content})가 ${new_goods_price}가격에 새로 등록되었습니다.`);    
    }

    catch(error){
        // if (error.message == "not int") await msg.reply("가격이 틀렸습니다.");
        // else if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
        // else await msg.reply("명령어가 틀렸습니다.");
    }
  }
};


