const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
require('dotenv').config();
const translate = require('translate-google');

module.exports = {
    name: 'translate',
    description: 'Sweet translator',
    options: [
        {
            name: 'language',
            description: 'enter a language to translate to',
            type: 'STRING',
            required: 'true',
        },
        {
            name: 'text',
            description: 'The thing you want to translate',
            type: 'STRING',
            required: 'true',
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const language = interaction.options.getString('language');
        const text = interaction.options.getString('text');

        translate(text, { to: language })
            .then((res) => {
                const replyEmbed = new MessageEmbed()
                    .setAuthor('S:\\client\\commands\\utility\\translate')
                    .setTitle(`Translated to: ${language}`)
                    .setColor(client.config.embedColor)
                    .setDescription(
                        `\`Original Message:\`
${text}\n\`Translated Message:\`\n${res}`
                    )
                    .setTimestamp();

                interaction.reply({ embeds: [replyEmbed] });
            })
            .catch((err) => {
                interaction.reply(
                    'An error occured. Please make sure you gave the Sweet a correct language to translate to.'
                );
            });
    },
};
