export const events = {
    name: 'interactionCreate',
    once: false,
}

export async function execute(interaction, client) {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return interaction.reply({ content: `Command ${interaction.commandName} Doesn't exist in the Module at this time.`, ephemeral: true });

    try {
        await command.execute(interaction, client);
    } catch (error) {
        // check reply error 
        //console.error(error);
        //return interaction.editReply({ content: `There was an error while executing this command: ${error.message}`, ephemeral: true });
    }
}