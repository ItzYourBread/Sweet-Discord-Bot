const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const path = require('path');

module.exports = {
    name: 'serverinfo',
    usage: '/serverinfo',
    category: 'utility',
    description: 'Get information and stats about the server',
    ownerOnly: false,

    run: async (client, interaction) => {
        const { guild } = interaction;

        const owner = await guild.fetchOwner();

        const tips = require('../../database/tips.json');
        let tip = tips.tip[Math.floor(Math.random() * tips.tip.length)];

        const embed = new MessageEmbed()
            .setAuthor('S:\\client\\commands\\utility\\serverinfo')
            .setColor(client.config.embedColor)
            .setTitle(`${guild.name}`)
            .setDescription(``)
            .addFields(
                {
                    name: 'Statistics',
                    value: `**Members**: ${guild.memberCount}\n**Emojis**: ${guild.emojis.cache.size}\n**Roles**: ${guild.roles.cache.size} `,
                },
                {
                    name: 'Staff',
                    value: `**Owner**: ${owner}\n**Creation**: ${moment(
                        interaction.guild.createdAt
                    ).fromNow()}`,
                }
            )
            .setFooter(`Guild ID: ${guild.id}`);

        interaction
            .reply({
                content: `\ ${tip}`,
                embeds: [embed],
                ephemeral: false,
            })
            .catch((err) =>
                console.error(
                    `${path.basename(
                        __filename
                    )} There was a problem sending an interaction: `,
                    err
                )
            );
    },
};
