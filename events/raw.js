export const events = {
    name: 'raw',
    once: false,
}

export async function execute(interaction, client) {
    if (interaction.t === 'VOICE_SERVER_UPDATE' || interaction.t === 'VOICE_STATE_UPDATE') {
        client.manager.updateVoiceState(interaction.d)
    }
}