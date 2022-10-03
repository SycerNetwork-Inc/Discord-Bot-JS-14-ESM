import { EmbedBuilder ,SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loop the current song or queue');

export async function execute(interaction, client) {
    const player = client.manager.players.get(interaction.guildId);
    if (!player) return interaction.reply({ content: 'No song/s currently playing in this guild!', ephemeral: true });
    if (!interaction.member.voice.channelId) return interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
    
    const queue = player.queue;
    const loop = player.trackRepeat ? 'off' : 'on';
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Loop', iconURL : interaction.user.displayAvatarURL({ dynamic: true })})
        .setColor(0x00FF00)
        .setDescription(`Loop is **${loop}**`)
        .setTimestamp();

    player.setTrackRepeat(!player.trackRepeat);
    return interaction.reply({ embeds: [embed] , ephemeral: true });
}
