module.exports = (client, message) => {
    client.player.events.on('playerStart', (queue, track) => {
        console.log('pitäisi soittaa');
        const channel = queue.metadata.channel; // queue.metadata is your "message" object
        channel.send(`🎶 | Nyt toistaa **${track.title}**`);
        channel.send(`Kappaleen pituus **${track.duration}**!`);
    });
}