const Discord = require("discord.js");
const client = new Discord.Client();
const helper = require("./helperfuncs.js");
const auth = require("./.auth.json");

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	switch(message.content) {
		case ".ping":
			message.channel.send("STOP POKING ME U FOOL");
			break;
		case ".antikick":
			var author = message.author;
			switch(helper.getRandomInt(2)) {
				case 0:
					message.channel.send("Please dont kick " + author + ", he was born that way!");
					break
				case 1:
					message.channel.send(author + " will be better next time, i promise!");
					break;
			}
			break		
	}
});

client.login(auth.token);