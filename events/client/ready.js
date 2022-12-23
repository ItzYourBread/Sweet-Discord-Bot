const { Client } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require('chalk');
const ms = require('ms');
const User = require('../../mongodb/premium/user');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client, message) {
        // Login into the bot message
        console.log(`Connected to ${client.user.username}`);

        // Puts an activity for Sweet
        client.user.setActivity('Website: https://sweet.cf', {
            type: 'STREAMING',
            url: 'https://www.twitch.tv/',
        });

        // Set Presence for Sweet
        client.user.setPresence({ status: 'online' });
        // Premium for Sweet
        const users = await User.find();
        for (let user of users) {
            client.userSettings.set(user.Id, user);
        }
        require('../../handlers/premium')(client);

        // Send a message on the console
        console.log(`
    >>> ${client.user.tag} is online <<<
---------------------------------------------
❒ Total guilds: ${client.guilds.cache.size}
❒ Total users: ${client.users.cache.size}
❒ Total channels: ${client.channels.cache.size}
❒ Websocket Ping: ${client.ws.ping}ms
---------------------------------------------
`);
    },
};
