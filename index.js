require('dotenv').config()
//console.log(process.env)
//const { generateDependencyReport } = require('@discordjs/voice');
//console.log(generateDependencyReport());
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player, useQueue } = require('discord-player');
const fs = require('node:fs');
//const queue = useQueue(process.env.GUILD_ID);

const events = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
//const logic = fs.readdirSync("./logic").filter((file) => file.endsWith(".js"));

const client = new Client({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent], });

const player = new Player(client);

player.config = {
    prefix: ";",
    playing: ";play (music)",
    defaultVolume: 50,
    maxVolume: 200,
    autoLeave: true,
    displayVoiceState: true,
    leaveOnStop: false,
    leaveOnEmpty: false,
    emitNewSongOnly: true,
};

player.config.ytdlOptions = {
    filter: 'audioonly',
    quality: 'highestaudio',
    highWaterMark: 1 << 10
}

const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
}

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
}

console.log(client.commands);

client.once("error", (message) => {
    console.error(`Error: ${message}`);
});

client.once('clientReady', c => {
    console.log(`✅ ${c.user.tag} is online`)

});
/*
client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content === '!deploy') {
        await message.guild.commands
            .set(client.commands)
            .then(() => {
                message.reply('Deployed!');
            })
            .catch(err => {
                message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
                console.error(err);
            });
    }
});


client.on('messageCreate', message => {
    if (message.author.bot || !message.guild) return;
    const prefix = "?"
    const args = message.content.slice(prefix.length).trim().split(/ +/g)

    if (args.shift().toLowerCase() === "play") {
        player.play(message.member?.voice?.channel, args.join(" "), {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
});
*/

client.on('messageCreate', async message => {
    console.log(message.client.id);
    const command = client.commands.get(message);
    command.execute(client, message);
});



//if (!queue.deleted) queue.delete();

client.destroy();

client.login(process.env.DISCORD_TOKEN);
