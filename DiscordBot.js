import discord from 'discord.js';
import { readdirSync } from 'fs';
import { token , cookie_nh, lavalink } from './config.js';
import { Manager } from 'erela.js';

console.clear();
console.log('[@] Starting...');

const [major, minor, patch] = process.versions.node.split('.').map(parseFloat);
if (major < 16 || minor < 17 || patch < 0) {
    console.error('[@] Node version is too old. Please update to 16.17.0 or higher.');
    process.exit(1);
}

const client = new discord.Client({
    intents: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65535]
});

client.manager = new Manager({
    nodes: lavalink,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

client.manager.on('nodeConnect', node => console.log(`[✔] Node connected`));
client.manager.on('nodeError', (node, error) => console.log(`[×] Node ${node.options.identifier} had an error: ${error.message}`));
client.manager.on('queueEnd', player => {
    player.destroy();
});


const handlersFiles = readdirSync("./handler").filter(file => file.endsWith('.js'));

for (const file of handlersFiles) {
    let handler = await import(`./handler/${file}`)
    handler.execute(client)
}

client.once('ready', async (res) => {
    console.log('\x1b[32m%s\x1b[0m' , `[⁂] ${res.user?.tag}`);
    client.manager.init(client.user.id);
    if(cookie_nh === undefined) {
        console.log('\x1b[31m%s\x1b[0m', '[!] Connect nhentai is 502');
    } else {
        console.log('\x1b[36m%s\x1b[0m', '[+] Connect nhentai is 200');
    }
});


client.login(token);
