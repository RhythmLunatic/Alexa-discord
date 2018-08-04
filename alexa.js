// Load up the discord.js library
const Discord = require("discord.js");
const request = require('snekfetch')

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	// Example of changing the bot's playing game to something useful. `client.user` is what the
	// docs refer to as the "ClientUser".
	//client.user.setActivity(`Serving ${client.guilds.size} servers`);
	client.user.setActivity("Playing Despacito 2 HD Remix");
	console.log("Add this bot to your server at https://discordapp.com/api/oauth2/authorize?client_id="+client.user.id+"&permissions=3164160&scope=bot")
});

client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	//client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	//client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
	// This event will run on every single message received, from any channel or DM.
	if(message.author.bot) return;
	
	if(message.content.toLowerCase().startsWith("alexa, play") || message.content.toLowerCase().startsWith("alexa play"))
	{
		var argument = message.content.split(" ").slice(2).join(" ")
		console.log(argument)
		try {
			var res = await request.get('https://www.googleapis.com/youtube/v3/search')
				.query('key', config.googleapikey)
				.query('part', 'snippet')
				.query('maxResults', '1')
				.query('q', argument)
				.query('type', 'video');
			return message.channel.send(`https://www.youtube.com/watch?v=${res.body.items[0].id.videoId}`);
		} catch (err) {
			//return message.channel.send(`no videos found for \`${argument}\``);
			console.log(err);
			return message.channel.send(err);
		}
	}
});

client.login(config.token);
					 
