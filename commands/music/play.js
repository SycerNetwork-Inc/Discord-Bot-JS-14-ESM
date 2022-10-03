import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song.')
    .addStringOption(option =>
        option.setName('song')
            .setDescription('The song you want to play.')
            .setRequired(true)
    );

export async function execute(interaction , client) {

    // check client manager connection lavalink
    if(client.manager.nodes.first().connected === false) {
        return interaction.reply({ content: '[!] Lavalink is not connected', ephemeral: true });
    }

    // check user in voice channel
    if(!interaction.member.voice.channelId) {
        return interaction.reply({ content: '[!] You are not in a voice channel', ephemeral: true });
    }

    const player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
        selfDeafen: true,
    });

    if (player.state !== 'CONNECTED') player.connect();

    const res = await player.search(interaction.options.getString('song'), interaction.user);

    if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw interaction.reply(`[×] There was an error while searching: ${res.exception.message}`);
    }

    await player.setVolume(50);

    switch (res.loadType) {
        case 'NO_MATCHES':
            if (!player.queue.current) player.destroy();
            return interaction.reply({ content: 'No results found.', ephemeral: true });
        case 'TRACK_LOADED':
        case 'SEARCH_RESULT':
            player.queue.add(res.tracks[0]);
            
            if (!player.playing && !player.paused && !player.queue.size) player.play();
            return interaction.reply({ content: `Enqueued ${res.tracks[0].title}`, ephemeral: true });
        case 'PLAYLIST_LOADED':
            player.queue.add(res.tracks);

            if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
            return interaction.reply({ content: `Enqueued playlist ${res.playlist.name} with ${res.tracks.length} tracks.`, ephemeral: true });
        case 'LOAD_FAILED':
            if (!player.queue.current) player.destroy();
            return interaction.reply({ content: `There was an error while searching: ${res.exception.message}`, ephemeral: true });
        case 'UNKNOWN':
            if (!player.queue.current) player.destroy();
            return interaction.reply({ content: 'There was an unknown error while searching.', ephemeral: true });
        default:
            if (!player.queue.current) player.destroy();
            return interaction.reply({ content: 'There was an error while searching.', ephemeral: true });

        }
}