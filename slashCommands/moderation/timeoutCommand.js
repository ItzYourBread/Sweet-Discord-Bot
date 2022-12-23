const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require('ms');
const { confirmButtons, modLog } = require('../../handlers/functions');

module.exports = {
    name: 'timeout',
    description: 'timeout a user',
    userPerm: ['MODERATE_MEMBERS'],
    botPerm: ['MODERATE_MEMBERS'],
    options: [
        {
            name: 'user',
            description: 'user to timeout',
            type: 'USER',
            required: true,
        },
        {
            name: 'time',
            description: 'amount of time to timeout',
            type: 'STRING',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for this timeout',
            type: 'STRING',
            required: false,
        },
    ],

    run: async (client, interaction) => {
        const target = interaction.options.getMember('user');
        const time = interaction.options.getString('time');
        const reason =
            interaction.options.getString('reason') || '`No Reason Provided`';
        const timeMs = ms(time);

        if (target.id === interaction.member.id)
            return interaction.reply({
                content: `${client.config.fail} You cant timeout yourself`,
            });

        if (target.id === interaction.guild.me.id)
            return interaction.reply({
                content: `${client.config.fail} You cant timeout me`,
            });

        if (target.id === interaction.guild.ownerId)
            return interaction.reply({
                content: `${client.config.fail} You cannot timeout the server owner`,
            });

        if (
            target.roles.highest.position >=
            interaction.member.roles.highest.position
        )
            return interaction.reply({
                content: `${client.config.fail} This user is higher/equal than you`,
            });

        if (
            target.roles.highest.position >=
            interaction.guild.me.roles.highest.position
        )
            return interaction.reply({
                content: `${client.config.fail} This user is higher/equal than me`,
            });

        if (!timeMs)
            return interaction.reply({
                content: `${client.config.fail} enter a specify a valid time`,
                ephemeral: true,
            });

        if (timeMs <= 19000)
            return interaction.reply({
                content: `${client.config.fail} You cannot create a timeout with a duration less than 20 seconds`,
                ephemeral: true,
            });

        if (timeMs > 2332800000)
            return interaction.reply({
                content: `${client.config.fail} You cannot create a timeout lasting longer than 27 days`,
                ephemeral: true,
            });

        const embed = new MessageEmbed()
            .setAuthor('S:\\client\\commands\\moderation\\timeout')
            .setDescription(
                `**${interaction.user.tag}** are you sure you want to timeout **${target.user.tag}**?`
            )
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setColor(client.config.embedColor)
            .setTimestamp();

        confirmButtons(interaction, {
            embed: embed,
            othersMessage: `Sorry only <@${interaction.member.id}> can use these buttons`,
            yes: {
                style: 'SECONDARY',
                label: 'Yes timeout',
            },
            no: {
                style: 'SECONDARY',
                label: 'Cancel',
            },
        }).then(async (confirm) => {
            if (confirm === 'yes') {
                await target.timeout(timeMs, reason);
                interaction.editReply({
                    content: `${client.config.success} **${target.user.tag}** has been timed out for **${time}**`,
                });
                modLog(interaction, reason, {
                    Action: '`Timeout`',
                    Member: `${target}`,
                    Time: `\`${time}\``,
                });
            }
            if (confirm === 'no') {
                interaction.editReply({
                    content: `${client.config.fail} **${target.user.tag}** Cancelling the timeout!`,
                });
            }
            if (confirm === 'time') {
                interaction.editReply({
                    content: `${client.config.fail} Cancelling time is up`,
                });
            }
        });
    },
};
