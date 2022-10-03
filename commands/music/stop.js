import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the music and leave the voice channel.');

export async function execute(interaction, client) {
    const player = client.manager.get(interaction.guild.id);
    if (!player) return interaction.reply({ content: 'There is no player for this guild!', ephemeral: true });
    player.destroy();
    return interaction.reply({ content: 'Player destroyed. Goodbye!', ephemeral: true });
}