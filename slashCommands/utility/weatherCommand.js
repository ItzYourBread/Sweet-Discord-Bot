const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Returns the weather on provided location.',
    options: [
        {
            name: 'location',
            description: 'The location to check weather of',
            type: 'STRING',
            required: 'true',
        },
    ],

    run: async (client, interaction) => {
        weather.find(
            {
                search: interaction.options.getString('location'),
                degreeType: 'C',
            },
            function (err, result) {
                if (result.length === 0)
                    return interaction.reply('Please enter a valid location.');

                var current = result[0].current;
                var location = result[0].location;

                let replyEmbed = new MessageEmbed()
                    .setAuthor('S:\\client\\commands\\utility\\weather')

                    .setTitle(`Sweet Weather`)
                    .addFields(
                        {
                            name: `City:`,
                            value: `${current.observationpoint}`,
                            inline: true,
                        },
                        {
                            name: `Weather Type:`,
                            value: `${current.skytext}`,
                            inline: true,
                        },
                        {
                            name: `Temperature:`,
                            value: `${current.temperature}`,
                            inline: true,
                        },
                        {
                            name: `Feels Like:`,
                            value: `${current.feelslike}`,
                            inline: true,
                        }
                    )
                    .setColor(client.config.embedColor)

                    .setTimestamp();

                interaction.reply({ embeds: [replyEmbed] });
            }
        );
    },
};
