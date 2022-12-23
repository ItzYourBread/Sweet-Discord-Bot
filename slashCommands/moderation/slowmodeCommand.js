const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { modLog } = require('../../handlers/functions');

module.exports = {
    name: 'slowmode',
    description: 'slowmode command',
    botPerm: ['MANAGE_CHANNELS'],
    userPerm: ['MANAGE_CHANNELS'],
    options: [
        {
            name: 'time',
            description: 'rate limit between 1 and 21600',
            type: 'INTEGER',
            required: true,
        },
        {
            name: 'channel',
            description:
                'enables slowmode in a channel with the specified rate',
            type: 'CHANNEL',
            required: false,
        },
        {
            name: 'reason',
            description: 'reason for this slowmode',
            type: 'STRING',
            required: false,
        },
    ],

    run: async (client, interaction) => {
        const time = interaction.options.getInteger('time');
        const channel =
            interaction.options.getChannel('channel') || interaction.channel;
        const reason =
            interaction.options.getString('reason') || '`No Reason Provided`';

        if (time <= 0 || time > '21600')
            return interaction.reply({
                content: `${client.config.fail} Time can not be set then 21600 or less then 0`,
            });

        if (!channel.isText()) {
            return interaction.reply({
                content: `${client.config.fail} Please select a text channel `,
            });
        }

        await channel.setRateLimitPerUser(time, reason);

        interaction.reply({
            content: `${client.config.success} Slowmode has been set to ${time}s in ${channel}`,
        });

        modLog(interaction, reason, {
            Action: '`Slowmode`',
            Channel: `${channel}`,
            Rate: `${time}`,
        });
    },
};
