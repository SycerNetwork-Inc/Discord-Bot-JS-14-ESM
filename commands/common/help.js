import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all of my commands or info about a specific command.');

export async function execute(interaction, client) {
    // list commands here and discrption 
    await interaction.reply('Pong!');
}