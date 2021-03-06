module.exports = (Discord, client, message) => {
    const prefix = "-";
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.command.get(cmd);

    if(command) command.execute(client, message, args, Discord);
}