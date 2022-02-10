const Discord = require('discord.js');
const fs = require("fs");
const config = require(`./config.json`);
const myIntents = new Discord.Intents(14031);
const client = new Discord.Client({intents:myIntents});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const eventFile of eventFiles) {
  const eventName = eventFile.split(".")[0];
  const event = require(`./events/${eventFile}`);
  client.on(eventName, event.bind(null, client));
}

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const commandFile of commandFiles) {
  const commandName = commandFile.split(".")[0];
  const command = require(`./commands/${commandFile}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(command.name, command);
}

client.login(config.botToken);