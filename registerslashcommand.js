import { REST } from '@discordjs/rest';
import { token, prefix, clientId } from './config.js';
import { readdirSync } from 'fs';

const commands = [];
const directoryCommandFiles = readdirSync(`./commands`)
    for (const directory of directoryCommandFiles) {
        let commandFiles = readdirSync(`./commands/${directory}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = await import(`./commands/${directory}/${file}`);
            commands.push(command.data.toJSON());
        }
    }

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            `/applications/${clientId}/commands`,
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

