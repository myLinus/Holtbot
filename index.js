require('dotenv').config()
const Discord = require('discord.js');
const myIntents = new Discord.Intents(14031);
const client = new Discord.Client({intents:myIntents});
const fs = require("fs");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

const files = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of files) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(command.name, command);
}

client.login(process.env.botToken)