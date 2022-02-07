const { Message } = require("discord.js");

client.on("message", (Message) => {
    const prefix = "-";
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + "help")){

    }

});