import discord from 'discord.js';
import { readdirSync } from 'fs';
import AsciiTable from 'ascii-table';
var table = new AsciiTable()

export async function execute(client) {
    table.setHeading('Commands', 'Stats').setBorder('|', '=', "0", "0")

    const commands = [];
    const directoryCommandFiles = readdirSync(`${process.cwd()}/commands`)
    client.commands = new discord.Collection();

    for (const directory of directoryCommandFiles) {
        let commandFiles = readdirSync(`${process.cwd()}/commands/${directory}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = await import(`../commands/${directory}/${file}`);
            client.commands.set(command.data.name, command);
            table.addRow(command.data.name.split('.js')[0], '✔')
            commands.push(command.data.toJSON());
        }
    }
    console.log(table.toString())
}