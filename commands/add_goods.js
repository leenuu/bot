const Discord = require('discord.js');

exports.run = async (client, msg, datas, args) => {

    try {
        var new_goods = args[0];
        var new_goods_price = args[1];
        var new_goods_content = args[2];
        if (isNaN(new_goods_price)) throw new Error("not int");
        new_goods_price = parseInt(new_goods_price);
    
        datas.add_goods(new_goods, new_goods_price,new_goods_content);
        await msg.reply(`${new_goods}(${new_goods_content})가 ${new_goods_price}가격에 새로 등록되었습니다.`);    
    }

    catch(error){
        if (error.message == "not int") await msg.reply("가격이 틀렸습니다.");
        else await msg.reply("명령어가 틀렸습니다.");
    }
};

exports.name = "상품추가";

