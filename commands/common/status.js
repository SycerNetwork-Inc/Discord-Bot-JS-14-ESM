import { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import pkg from 'node-os-utils';

export const data = new SlashCommandBuilder()
    .setName('status')
    .setDescription('Get status server bot info');


export async function execute(interaction, client) {
    interaction.reply({ content: 'Loading...', ephemeral: true });

    const server_bt = new ButtonBuilder()
        .setStyle(2)
        .setLabel("Server")
        .setEmoji("🌐")
        .setCustomId('server')
    const lavalink_bt = new ButtonBuilder()
        .setStyle(2)
        .setLabel("Lavalink")
        .setEmoji("🎵")
        .setCustomId('lavalink')


    const cpu = await pkg.cpu.usage();
    const mem = await pkg.mem.used();
    const os = await pkg.os.oos();
    const arch = await pkg.os.arch();
    const uptime = await pkg.os.uptime();
    const cpuCount = await pkg.cpu.count();
    const cpuModel = await pkg.cpu.model();

    // nodejs version and discordjs version
    const nodejs = process.version;
    // get discord js version from package.json file in root folder of project (bot)
    const discordjs = await import('../../package.json', { assert: { type: 'json' } }).then(m => m.default.dependencies['discord.js']);
    const got = await import('../../package.json', { assert: { type: 'json' } }).then(m => m.default.dependencies['got']);
    const erelaJS = await import('../../package.json', { assert: { type: 'json' } }).then(m => m.default.dependencies['erela.js']); 

    // uptime seconds to days, hours, minutes, seconds
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const seconds = Math.floor(uptime % 60);

    // client.uptime /1000  seconds to days, hours, minutes, seconds
    const days2 = Math.floor(client.uptime / 86400000);
    const hours2 = Math.floor(client.uptime / 3600000) % 24;
    const minutes2 = Math.floor(client.uptime / 60000) % 60;
    const seconds2 = Math.floor(client.uptime / 1000) % 60;

    const embed = new EmbedBuilder();
    embed.setTitle('Status');
    embed.setColor(0x00FF00);
    embed.setDescription(`
    **CPU:** ${cpu}%
    **Memory:** ${mem.usedMemMb}MB / ${mem.totalMemMb}MB
    **OS:** ${os}
    **Arch:** ${arch}
    **Uptime:** ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds
    **UpTimeClient:** ${days2} days, ${hours2} hours, ${minutes2} minutes, ${seconds2} seconds
    **CPU Count:** ${cpuCount}
    **CPU Model:** ${cpuModel}

    **NodeJS:** ${nodejs}
    **DiscordJS:** ${discordjs}
    **Got:** ${got}
    **ErelaJS:** ${erelaJS}
    `);
    
    const all = client.manager.nodes.map(node =>
      `Player: ${node.stats.players}` +
      `\nPlaying Players: ${node.stats.playingPlayers}` +
      `\nUptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}` +
      `\n\nMusic Memory` +
      `\nReservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
      `\nUsed Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
      `\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
      `\nAllocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
      "\n\nMusic CPU" +
      `\nCores: ${node.stats.cpu.cores}` +
      `\nSystem Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
      `\nCore Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
  ).join('\n\n\n');

    const lavalink = new EmbedBuilder()
      .setTitle(`MusicCore`)
      .setDescription(`\`\`\`${all}\`\`\``)
      .setColor(0xFFDCF4)

    const row = new ActionRowBuilder()
        .addComponents(server_bt, lavalink_bt)

    interaction.editReply({ embeds: [embed], components: [row] });

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
        if (i.customId === 'server') {
            i.update({ embeds: [embed], components: [row] });
        } else if (i.customId === 'lavalink') {
            i.update({ embeds: [lavalink], components: [row] });
        }
    }
    );
}
