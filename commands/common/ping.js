import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping to server and reply with latency');

export async function execute(interaction, client) {
    await interaction.reply({ content: `Boom! ${client.ws.ping}ms`, ephemeral: true });
}