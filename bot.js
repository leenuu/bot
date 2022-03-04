// const Discord = require('discord.js');
// const bot_config = require('./bot_config.json');
// const Data_Control = require('./data/main.js')
// const prefix = ">";
// const fs = require('fs');

// const datas = new Data_Control()
// const test = "test"

// const client = new Discord.Client({ 
//     intents: [
//         "GUILDS", 
//         "GUILD_MESSAGES"
//     ] 
// });

// client.commands = new Discord.Collection() 
// console.log(fs.readdirSync("./commands"))

// client.commands.load = dir => {
//     console.log(fs.readdirSync(dir))
//     for (const file of fs.readdirSync(dir)) {
//         const cmd = require(`./commands/${file}`);
//         console.log(cmd)
//         client.commands.set(cmd.name, cmd);
//     }
//     console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
// }

// client.commands.load("./commands");

// // console.log(__dirname)

// client.on('ready', () => console.log(`${client.user.tag} 에 로그인됨`));


// client.on("interactionCreate", async (interaction) => {
//     if (!interaction.isCommand()) return;
  
//     const command = client.commands.get(interaction.commandName);
  
//     if (!command) return;
  
//     try {
//       await command.execute(interaction);
//     } catch (error) {
//       console.error(error);
//       await interaction.reply({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     }
//   });

    

// client.on("roleUpdate", async (oldRole, newRole) => {

//     console.log(oldRole);
//     console.log(newRole);
   
// });

// client.on('guildMemberRemove', async member => {
//     console.log(member.user.username)
// });

// client.on('message', async msg => {
//     // msg.attachments.forEach(function(attachment) {
//     // console.log(attachment.url)})
//     // if (msg.member.roles.cache.find(role => role.id === '')) console.log("12")
//     if (msg.author.bot) return;
//     // var user = `<@!${msg.author.id}>`;
//     // datas.add_chat_count(user);
//     if (!msg.content.startsWith(prefix )) return;

//     if (msg.content.slice(0, prefix.length) !== prefix) return;
    
//     const args = msg.content.slice(prefix.length).trim().split(/ +/g);
//     // console.log(msg.content.slice(prefix.length).trim().split(/ +/g));
//     const command = args.shift().toLowerCase();

//     let cmd = client.commands.get(command);
//     if(cmd) cmd.run(client, msg, datas ,args);
// });


// client.login(bot_config.BOT_TOKEN);

const { Client, Collection, Intents } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot_config = require('./bot_config.json');
const fs = require('node:fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commands = [];
var commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = bot_config.clientId;
const guildId = bot_config.guildId;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(bot_config.BOT_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
        
		console.log('Successfully reloaded application (/) commands.');
        console.log(commands.map(c => c.name).join(', ') + ' loads');
	} catch (error) {
		console.error(error);
	}
})();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("bot ready!");
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
        });
    }
});

client.login(bot_config.BOT_TOKEN);