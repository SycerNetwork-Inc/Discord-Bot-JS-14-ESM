import { ShardingManager } from "discord.js";
import { token } from "./config.js";

const manager = new ShardingManager("./DiscordBot.js", {
    token: token,
    totalShards: 2,
    mode: "process",
    respawn: false,
    shardArgs: ["--ansi"],
    execArgv: ["--max-old-space-size=2048"],
    shardList: [0, 1],
});

manager.on("shardCreate", (shard) => {
    console.log(`[~] Shard ${shard.id} is ready`);
});

manager.spawn();