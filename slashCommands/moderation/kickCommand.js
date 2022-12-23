const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { confirmButtons, modLog } = require('../../handlers/functions');

module.exports = {
    name: 'kick',
    description: 'kick a member',
    userPerm: ['KICK_MEMBERS'],
    botPerm: ['KICK_MEMBERS'],
    options: [
        {
            name: 'user',
            description: 'select the user to kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for this kick',
            type: 'STRING',
            required: false,
        },
    ],

    run: async (client, interaction) => {
        const target = interaction.options.getMember('user');
        const reason =
            interaction.options.getString('reason') || '`No Reason Provided`';

        if (target.id === interaction.member.id)
            return interaction.reply({
                content: `${client.config.fail} You cant kick yourself`,
            });

        if (target.id === interaction.guild.me.id)
            return interaction.reply({
                content: `${client.config.fail} You cant kick me`,
            });

        if (target.id === interaction.guild.ownerId)
            return interaction.reply({
                content: `${client.config.fail} You cannot kick the server owner`,
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

        const embed = new MessageEmbed()
            .setAuthor('S:\\client\\commands\\moderation\\kick')
            .setDescription(
                `**${interaction.user.tag}** are you sure you want to kick **${target.user.tag}**?`
            )
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .setColor(client.config.embedColor)
            .setTimestamp();

        confirmButtons(interaction, {
            embed: embed,
            othersMessage: `Sorry only <@${interaction.member.id}> can use these buttons`,
            yes: {
                style: 'SECONDARY',
                label: 'Yes kick!',
            },
            no: {
                style: 'SECONDARY',
                label: 'Cancel',
            },
        }).then(async (confirm) => {
            if (confirm === 'yes') {
                await target.kick(reason);
                interaction.editReply({
                    content: `${client.config.success} Kicked **${target.user.tag}** successfully!`,
                });
                modLog(interaction, reason, {
                    Action: '`Kick`',
                    Member: `\`${target.user.tag}\``,
                });
            }
            if (confirm === 'no') {
                interaction.editReply({
                    content: `${client.config.fail} **${target.user.tag}** kick has been cancelled!`,
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
