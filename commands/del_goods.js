const Discord = require('discord.js');

exports.run = async (client, msg, datas, args) => {

    try {
        if (!msg.member.roles.cache.some(role => role.id === datas.bot_config["management_user_role_id"])) throw new Error('permission denied.');

        var goods = args[0];

        var status = datas.del_goods(goods);
        if (status == -1) throw new Error(`not found.`);
        await msg.reply(`${goods}가 상품목록에서 제거 되었습니다.`);
    }

    catch(error) {
        if (error.message == 'not found.') await msg.reply(`${goods}가 상품목록에 존재하지 않습니다.`);
        else if (error.message == 'permission denied.') await msg.reply(`권한이 없습니다.`);
    }
};

exports.name = "상품제거";