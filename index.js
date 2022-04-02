const Discord = require('discord.js');
const fs = require("fs");
const config = require(`./config.json`);
const mongoose = require('mongoose')
const myIntents = new Discord.Intents(14031);
const client = new Discord.Client({intents:myIntents});
const db = config.mongoDB;


client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
})


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



client.login(config.botToken);