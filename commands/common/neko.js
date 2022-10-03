import got from 'got';
import { EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('neko')
    .setDescription('Get a random neko image.');

export async function execute(interaction) {

    got.get('https://nekos.best/api/v2/neko').then(res => {
    const data = JSON.parse(res.body)
    const embed = new EmbedBuilder();
        embed.setAuthor({ name: data["results"][0]["artist_name"] , url: data["results"][0]["artist_href"] });
        embed.setDescription(`Source : [${data["results"][0]["source_url"]}](${data["results"][0]["source_url"]})`);
        embed.setImage(data["results"][0]["url"]);
        embed.setColor(0xFF69B4);
        interaction.reply({ embeds: [embed] });
    })
}

