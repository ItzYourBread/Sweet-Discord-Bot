const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    usage: '/meme',
    category: 'fun',
    description: 'see some popular meme from SubReddit',
    ownerOnly: false,
    run: async (client, interaction, args) => {
        let meme = await fetch('https://meme-api.herokuapp.com/gimme').then(
            (r) => r.json()
        );
        let interaction_message = await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setAuthor('S:\\client\\commands\\fun\\meme')
                    .setTitle(meme.title)
                    .setURL(meme.postLink)
                    .setImage(meme.url)
                    .setColor(client.config.embedColor)
                    .setFooter({
                        text: `${meme.ups} 👍 || r/${meme.subreddit}`,
                    }),
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton()
                        .setLabel('Next Meme')
                        .setStyle('SUCCESS')
                        .setCustomId('refresh-button'),
                    new MessageButton()
                        .setLabel('End Interaction')
                        .setStyle('SECONDARY')
                        .setCustomId('end'),
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
                    content: `This is not your menu, make one by typing /meme.`,
                    ephemeral: true,
                });
            collector.on('collect', async (i) => {
                if (i.customId == 'end') {
                    i.deferUpdate();
                    interaction.editReply({ components: [] });
                }

                if (i.customId === 'refresh-button') {
                    await i.deferUpdate();
                    let meme2 = await fetch(
                        'https://meme-api.herokuapp.com/gimme'
                    ).then((r) => r.json());
                    return interaction_message.edit({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor('S:\\client\\commands\\fun\\meme')
                                .setTitle(meme2.title)
                                .setURL(meme2.postLink)
                                .setImage(meme2.url)
                                .setColor(client.config.embedColor)
                                .setFooter({
                                    text: `${meme2.ups} 👍 〢 r/${meme2.subreddit}`,
                                }),
                        ],
                    });
                }
            });
        });
    },
};
