const Discord = require('discord.js');
const hugs = require('../../database/actions/hug.json');

module.exports = {
    name: 'hug',
    usage: '/hug <user>',
    category: 'Actions',
    description: "hug your friend's!",
    options: [
        {
            name: 'user',
            description: 'Select a user.',
            type: 'USER',
            required: true,
        },
    ],

    run: async (client, interaction) => {
        const Target = interaction.options.getUser('user') || interaction.user;

        if (Target.id === interaction.member.id)
            return interaction.reply({
                content: `ARE YOU SURE? YOU CANNOT HUG YOURSELF! GO MAKE SOME SENSES`,
            });

        let hug = hugs.hug[Math.floor(Math.random() * hugs.hug.length)];

        const embed = new Discord.MessageEmbed()

            .setFooter(
                `${interaction.user.username} hugs ${Target.username}! aww... so cute`
            )
            .setColor(client.config.embedColor)
            .setImage(`${hug}`)
            .setAuthor('S:\\client\\commands\\actions\\hug');

        interaction.reply({ embeds: [embed] });
    },
};
