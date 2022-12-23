const { Client, MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: "Displays the mentioned user's avatar",
    options: [
        {
            name: 'user',
            description: 'Select a user.',
            type: 'USER',
            required: false,
        },
    ],
    premium: false,

    run: async (client, interaction, args) => {
        const Target = interaction.options.getUser('user') || interaction.user;

        const tips = require('../../database/tips.json');
        let tip = tips.tip[Math.floor(Math.random() * tips.tip.length)];

        const embed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setAuthor('S:\\client\\commands\\utility\\avatar')
            .setImage(Target.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setFooter(
                `Requested By ${interaction.user.tag}`,
                interaction.user.displayAvatarURL({ dynamic: true })
            );

        interaction.reply({ content: `\ ${tip}`, embeds: [embed] });
    },
};
