const Discord = require('discord.js');
const bot_config = require('./bot_config.json');
const Data_Control = require('./data/main.js')
const prefix = ">";
const fs = require('fs');

const datas = new Data_Control()
const test = "test"

const client = new Discord.Client({ 
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES"
    ] 
});

client.commands = new Discord.Collection() 
// console.log(fs.readdirSync("./commands"))

client.commands.load = dir => {
    console.log(fs.readdirSync(dir))
    for (const file of fs.readdirSync(dir)) {
        const cmd = require(`./commands/${file}`);
        console.log(cmd)
        client.commands.set(cmd.name, cmd);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
}

client.commands.load("./commands");

// console.log(__dirname)

client.on('ready', () => console.log(`${client.user.tag} 에 로그인됨`));

// client.on("roleUpdate", async (oldRole, newRole) => {

//     console.log(oldRole);
//     console.log(newRole);
   
// });

// client.on('guildMemberRemove', async member => {
//     console.log(member.user.username)
// });

client.on('message', async msg => {
    // msg.attachments.forEach(function(attachment) {
    // console.log(attachment.url)})
    // if (msg.member.roles.cache.find(role => role.id === '')) console.log("12")
    if (msg.author.bot) return;
    // var user = `<@!${msg.author.id}>`;
    // datas.add_chat_count(user);
    if (!msg.content.startsWith(prefix )) return;

    if (msg.content.slice(0, prefix.length) !== prefix) return;
    
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    // console.log(msg.content.slice(prefix.length).trim().split(/ +/g));
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command);
    if(cmd) cmd.run(client, msg, datas ,args);
});


client.login(bot_config.BOT_TOKEN);