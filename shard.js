const { ShardingManager } = require('discord.js');
require('dotenv').config();

let manager = new ShardingManager('./index.js', {
    token: process.env.TOKEN,
    totalShards: 2,
    mode: 'process',
    // execArgv: ['--inspect']
});

manager.on('shardCreate', shard => {
    console.log(`[Shard ${shard.id + 1}] Ready!`);
})

manager.spawn();