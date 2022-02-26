const Discord = require('discord.js');
const bot_config = require('./bot_config.json')
const prefix = "!";
const fs = require('fs');

const client = new Discord.Client({ 
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES"
    ] 
});

client.commands = new Discord.Collection() 
// console.log(fs.readdirSync("./commands"))

client.commands.load = dir => {
    for (const file of fs.readdirSync(dir)) {
        const cmd = require(`./commands/${file}`);
        console.log(cmd)
        client.commands.set(cmd.name, cmd);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
}

client.commands.load("./commands");
//해당 파일이 위치한 디렉터리에서 "/commands" 경로를 추가

client.on('ready', () => console.log(`${client.user.tag} 에 로그인됨`));

client.on('message', msg => {
    if (msg.author.bot) return;
    

    if (!msg.content.startsWith(prefix)) return;

    if (msg.content.slice(0, prefix.length) !== prefix) return;
    

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command);
    if(cmd) cmd.run(client, msg, args);
})


client.login(bot_config.BOT_TOKEN);
