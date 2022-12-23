const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const drive = osu.drive;
const mem = osu.mem;
const os = osu.os;
const si = require('systeminformation');
const mongoose = require('mongoose');
require('moment-duration-format');
const moment = require('moment');

module.exports = {
    name: 'stats',
    usage: '/stats',
    category: 'utility',
    description: 'Get Sweet statistics!',
    premium: false,

    run: async (client, interaction) => {
        await interaction.reply({ content: `Loading...` });

        const guildstotal = await client.shard.fetchClientValues(
            'guilds.cache.size'
        );
        const userstotal = await client.shard.fetchClientValues(
            'users.cache.size'
        );
        const channelstotal = await client.shard.fetchClientValues(
            'channels.cache.size'
        );
        const cpuCount = cpu.count();
        let cpuUsagePercentage;
        let driveInfo;
        let memInfo;
        let osInfo;
        let processor;
        await cpu.usage().then((cpuPercentage) => {
            cpuUsagePercentage = cpuPercentage;
        });
        await drive
            .info()
            .then((info) => {
                driveInfo = info;
            })
            .catch((err) => {
                driveInfo = {
                    totalGb: err.name,
                    usedGb: err.name,
                    freeGb: err.name,
                    usedPercentage: err.name,
                    freePercentage: err.name,
                };
            });
        await mem.info().then((info) => {
            memInfo = info;
        });
        await os.oos().then((info) => {
            osInfo = info;
        });
        await si
            .cpu()
            .then((data) => (processor = data))
            .catch((error) => console.error(error));

        const duration = moment
            .duration(interaction.client.uptime)
            .format('D[d], H[h], m[m], s[s]');

        const embed = new Discord.MessageEmbed()
            .setAuthor('S:\\client\\commands\\utility\\stats')
            .addFields(
                {
                    name: 'General',
                    value: `** **\ **Name:** ${
                        client.user.tag
                    }\n  **Shard:**  #${interaction.guild.shardId + 1} / ${
                        client.shard.count
                    }\n  **Guilds:** ${
                        client.guilds.cache.size
                    } / ${guildstotal.reduce(
                        (acc, guildCount) => acc + guildCount,
                        0
                    )}\n  **Users:** ${
                        client.users.cache.size
                    } / ${userstotal.reduce(
                        (acc, userCount) => acc + userCount,
                        0
                    )}\n  **Channels:** ${
                        client.channels.cache.size
                    } / ${channelstotal.reduce(
                        (acc, channelCount) => acc + channelCount,
                        0
                    )}\n  **Websocket Status:** ${
                        client.ws.status
                    }\n  **Websocket Ping:** ${client.ws.ping.toLocaleString()}ms\n** **`,
                    inline: true,
                },
                {
                    name: `System`,
                    value: `** **\ **CPU Core:** ${cpuCount}\n  **CPU Usage:** ${cpuUsagePercentage.toFixed(
                        2
                    )}%\n  **Drive Usage:** ${driveInfo.usedGb}GB (${
                        driveInfo.usedPercentage
                    }%)\n  **Memory Usage:** ${(
                        memInfo.usedMemMb / 1000
                    ).toFixed(2)}GB (${(
                        100 - memInfo.freeMemPercentage
                    ).toFixed(
                        2
                    )}%)\n  **Operating System:** ${osInfo}\n  **Processor:** ${
                        processor.manufacturer
                    }\n  **Uptime:** ${duration}\n** **`,
                    inline: true,
                }
            )
            .setFooter(
                `Made by Arif | Cluster: 1 | Shard: ${client.shard.count} | Version: Sweet 1.4.0`
            )
            .setColor(client.config.embedColor);

        interaction
            .editReply({ content: `\ `, embeds: [embed] })
            .catch((e) => interaction.followUp(e));
    },
};
