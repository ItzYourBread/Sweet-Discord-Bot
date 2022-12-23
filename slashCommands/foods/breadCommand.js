const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'bread',
    usage: '/bread',
    category: 'foods',
    description: 'Get some bread photos',
    ownerOnly: false,
    run: async (client, interaction, args) => {
        const breads = require('../../database/foods/bread.json');

        let bread =
            breads.bread[Math.floor(Math.random() * breads.bread.length)];

        let interaction_message = await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor('S:\\client\\commands\\foods\\bread')
                    .setTitle(`here is your bread!`)
                    .setURL(`${bread}`)
                    .setImage(`${bread}`)
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
                    content: `${client.config.fail} This is not your menu, make one by typing /bread.`,
                    ephemeral: true,
                });
            if (i.customId === 'refresh-button') {
                await i.deferUpdate();
                const breads = require('../../database/foods/bread.json');

                let bread =
                    breads.bread[
                        Math.floor(Math.random() * breads.bread.length)
                    ];
                return interaction_message.edit({
                    embeds: [
                        new MessageEmbed()
                            .setAuthor('S:\\client\\commands\\foods\\bread')
                            .setTitle(`here you are!`)
                            .setURL(`${bread}`)
                            .setImage(`${bread}`)
                            .setColor(client.config.embedColor),
                    ],
                });
            }
        });
    },
};
