const { QueryType, useMasterPlayer, useQueue } = require('discord-player')
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'stop',
    description: 'Stop the currently playing song',
    voiceChannel: true,
  
 async execute(interaction) {
        try {
            const player = interaction.client.player;
            const guildId = interaction.guildId;

            if (!player.isPlaying(guildId)) {
                return interaction.reply('No song is currently playing');
            }

            player.stop(guildId);
            interaction.reply('The song has been stopped');
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while trying to stop the song');
        }
    },
};
