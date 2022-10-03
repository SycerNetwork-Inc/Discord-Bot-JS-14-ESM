import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set the volume of the bot.')
    .addIntegerOption(option =>
        option.setName('number')
            .setDescription('The volume to set.')
            .setRequired(true));

export async function execute(interaction, client) {
    const player = client.manager.get(interaction.guild.id);
    if (!player) return interaction.reply({ content: 'There is no player for this guild!', ephemeral: true });
    const volume = interaction.options.getInteger('number');
    if (volume < 0 || volume > 100) return interaction.reply({ content: 'The volume must be between 0 and 100.', ephemeral: true });
    player.setVolume(volume);
    return interaction.reply({ content: `Volume set to ${volume}%`, ephemeral: true });
}