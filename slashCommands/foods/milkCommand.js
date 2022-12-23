const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'milk',
    usage: '/milk',
    category: 'foods',
    description: 'Get some milk photos',
    ownerOnly: false,
    run: async (client, interaction, args) => {
        const milks = require('../../database/foods/milk.json');

        let milk = milks.milk[Math.floor(Math.random() * milks.milk.length)];

        let interaction_message = await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor('S:\\client\\commands\\foods\\milk')
                    .setTitle(`here is your milk!`)
                    .setURL(`${milk}`)
                    .setImage(`${milk}`)
                    .setColor(client.config.embedColor),
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton()
                        .setLabel('Next')
                        .setStyle('PRIMARY')
                        .setCustomId('refresh-button'),
                ]),
            ],
            fetchReply: true,
        });
        const collector =
            await interaction_message.createMessageComponentCollector({
                filter: (fn) => fn,
                componentType: 'BUTTON',
            });

        collector.on('collect', async (i) => {
            if (i.user.id !== interaction.user.id)
                return i.reply({
                    content: `This is not your menu, make one by typing /milk.`,
                    ephemeral: true,
                });
            if (i.customId === 'refresh-button') {
                await i.deferUpdate();
                const milks = require('../../database/foods/milk.json');

                let milk =
                    milks.milk[Math.floor(Math.random() * milks.milk.length)];
                return interaction_message.edit({
                    embeds: [
                        new MessageEmbed()
                            .setAuthor('S:\\client\\commands\\foods\\milk')
                            .setTitle(`here you are!`)
                            .setURL(`${milk}`)
                            .setImage(`${milk}`)
                            .setColor(client.config.embedColor),
                    ],
                });
            }
        });
    },
};
