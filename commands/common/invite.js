import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite the bot to your server.');

export async function execute(interaction, client) {
    await interaction.reply({ content: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`, ephemeral: true });
}