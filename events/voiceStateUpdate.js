export const events = {
    name: 'voiceStateUpdate',
    once: false,
}

export async function execute(oldState, newState, client) {
    const player = client.manager.players.get(newState.guild.id);
    if(player) {
        const voiceChannel = client.channels.cache.get(player.voiceChannel);
        if(voiceChannel.members.size === 1) {
            console.log('No one is in the voice channel, destroying player.');
            player.destroy();
        }
    }
}
