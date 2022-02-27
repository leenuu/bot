const Discord = require('discord.js');

exports.run = async (client, msg, datas, args) => {

    try {
        var goods = args[0];

        var status = datas.del_goods(goods);
        if (status == -1) throw new Error(`not found.`);
        await msg.reply(`${goods}가 상품목록에서 제거 되었습니다.`);
    }

    catch(error) {
        if (error.message == 'not found,') await msg.reply(`${goods}가 상품목록에 존재하지 않습니다.`);
    }
};

exports.name = "상품제거";