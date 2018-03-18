const Discord = require("discord.js");
const client = new Discord.Client();
const helper = require("./helperfuncs.js");
const auth = require("./.auth.json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require("request");
const fs = require('fs');


client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	var cont = message.content;

	if (!message.guild) return;

	if(cont === ".ping") {
		message.channel.send("STOP POKING ME U FOOL");
	} else if(cont === ".antikick"){
		var author = message.author;
		switch(helper.getRandomInt(2)) {
				case 0:
					message.channel.send("Please dont kick " + author + ", he was born that way!");
					break
				case 1:
					message.channel.send(author + " will be better next time, i promise!");
					break;
		}	
	}  else if (cont === ".join") {
		if(message.member.voiceChannel) {
			message.member.voiceChannel.join();
		} else {
			message.reply("join a voice channel first");
		}
	} else if (cont === ".leave") {
		if(message.guild.me.voiceChannel) {
			message.guild.me.voiceChannel.leave();
		}
	}  else if (cont.startsWith(".sb")) {
		if(message.member.voiceChannel) {
			var arg = cont.split(" ")[1];
			var url = "";
			request("http://www.myinstants.com/search/?name=" + arg, function (error, response, body) {
	  			if(!error) {
	  				const dom = new JSDOM(body);
	  				if(dom.window.document.getElementsByClassName("instant").length > 0) {
		  				url = "https://www.myinstants.com" + dom.window.document.getElementsByClassName("instant")[0].getElementsByClassName("small-button")[0].getAttribute("onmousedown").split("'")[1];
		  				request.get(url).on("error", function(err) {
							console.log("error downloading mp3");
						}).pipe(fs.createWriteStream("soundclips/temp.mp3").on("close", () => {
							message.member.voiceChannel.join().then(connection => {
								const dispatcher = connection.playFile("soundclips/temp.mp3");
								dispatcher.on("end", () => {
									message.member.voiceChannel.leave();
								});
							});
						}));
					} else {
						message.reply("No results found");
					}
	  			} else {
	  				console.log("Something went wrong with the soundboard");
	  			}
			});
			
		}
	}
});

client.login(auth.token);