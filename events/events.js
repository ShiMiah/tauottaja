player.events.on('playerStart', (queue, track) => {
    const channel = queue.metadata.channel; // queue.metadata is your "message" object
    channel.send(`🎶 | Started playing **${track.title}**`);
});