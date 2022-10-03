import { readdirSync } from 'fs';

export async function execute(client) {
    const eventFiles = readdirSync(`./events`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        console.log(`[~] Loading Event: ${file}`);
        const header = await import(`../events/${file}`);

        if (header.events.name === 'raw') {
            client.on(header.events.name, (interaction) => header.execute(interaction, client));
        }

        if (header.events.once && header.events.name !== 'raw') {
            client.once(header.events.name, (...args) => header.execute(...args, client));
        } else if (header.events.name !== 'raw') {
            client.on(header.events.name, (...args) => header.execute(...args, client));
        }
    }
}