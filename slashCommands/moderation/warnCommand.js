const warnModel = require('../../mongodb/models/warn');
const moment = require('moment');
const { confirmButtons, modLog } = require('../../handlers/functions');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'warn a user or remove or check',
    userPerm: ['MANAGE_MESSAGES'],
    botPerm: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'check',
            description: 'check user warnings',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'user you want to check warnings on',
                    type: 'USER',
                    required: true,
                },
            ],
        },
        {
            name: 'add',
            description: 'warn a user',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'User to warn',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'reason for this warn',
                    type: 'STRING',
                    required: false,
                },
            ],
        },
        {
            name: 'remove',
            description: 'remove warn from a user',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'warnid',
                    description: 'warn id you want to delete from them',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'reason for removing the warn from them',
                    type: 'STRING',
                    required: false,
                },
            ],
        },
    ],

    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === 'check') {
            const target = interaction.options.getMember('user');
            const userWarnings = await warnModel.find({
                userId: target.id,
                guildId: interaction.guildId,
            });

            if (!userWarnings?.length)
                return interaction.reply({
                    content: `${client.config.fail} ${target} has no warnings`,
                });

            const embedDescription = userWarnings
                .map((warn) => {
                    const moderator = interaction.guild.members.cache.get(
                        warn.moderatorId
                    );

                    return [
                        `Moderator: ${moderator || `${fail}`}`,
                        `Reason: \`${warn.reason}\``,
                        `Date: \`${moment(warn.timestamp).format(
                            'MMMM Do YYYY'
                        )}\``,
                        `Warn id: \`${warn._id}\``,
                    ].join('\n');
                })
                .join('\n\n');

            const embed = new MessageEmbed()
                .setAuthor('S:\\client\\commands\\moderation\\warn\\check')
                .setTitle(`${target.user.tag}'s warnings`)
                .setDescription(embedDescription)
                .setColor('#FFFF90');

            interaction.reply({
                embeds: [embed],
            });
        } else if (interaction.options.getSubcommand() === 'add') {
            const target = interaction.options.getMember('user');
            const reason =
                interaction.options.getString('reason') ||
                '`No Reason Provided`';

            if (target.id === interaction.member.id)
                return interaction.reply({
                    content: `${client.config.fail} You cant warn yourself`,
                });

            if (target.id === interaction.guild.me.id)
                return interaction.reply({
                    content: `${client.config.fail} You cant warn me`,
                });

            if (target.id === interaction.guild.ownerId)
                return interaction.reply({
                    content: `${client.config.fail} You cannot warn the server owner`,
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

                .setAuthor('S:\\client\\commands\\moderation\\warn\\add')
                .setDescription(
                    `**${interaction.user.tag}** are you sure you want to warn **${target.user.tag}**?`
                )
                .setFooter(client.user.tag, client.user.displayAvatarURL())
                .setColor(client.config.embedColor)
                .setTimestamp();

            confirmButtons(interaction, {
                embed: embed,
                othersMessage: `Sorry only <@${interaction.member.id}> can use these buttons`,
                yes: {
                    style: 'SECONDARY',
                    label: 'Yes warn',
                },
                no: {
                    style: 'SECONDARY',
                    label: 'Cancel',
                },
            }).then(async (confirm) => {
                if (confirm === 'yes') {
                    await new warnModel({
                        userId: target.id,
                        guildId: interaction.guildId,
                        moderatorId: interaction.user.id,
                        reason,
                        timestamp: Date.now(),
                    }).save();
                    interaction.editReply({
                        content: `${client.config.success} Warned **${target.user.tag}** successfully!`,
                    });
                    modLog(interaction, reason, {
                        Action: '`Warn`',
                        Member: `${target}`,
                    });
                }
                if (confirm === 'no') {
                    interaction.editReply({
                        content: `${client.config.fail} **${target.user.tag}** Ban has been cancelled`,
                    });
                }
                if (confirm === 'time') {
                    interaction.editReply({
                        content: `${client.config.fail} Cancelling time is up`,
                    });
                }
            });
        } else if (interaction.options.getSubcommand() === 'remove') {
            try {
                const warnId = interaction.options.getString('warnid');
                const data = await warnModel.findById(warnId);

                const user = interaction.guild.members.cache.get(data.userId);
                const reason =
                    interaction.options.getString('reason') ||
                    '`No Reason Provided`';

                const embed = new MessageEmbed()
                    .setAuthor('S:\\client\\commands\\moderation\\warn\\remove')
                    .setDescription(
                        `**${interaction.user.tag}** are you sure you want to remove warn from **${user}**?`
                    )
                    .setFooter(client.user.tag, client.user.displayAvatarURL())
                    .setColor(client.config.embedColor)
                    .setTimestamp();

                confirmButtons(interaction, {
                    embed: embed,
                    othersMessage: `Sorry only <@${interaction.member.id}> can use these buttons`,
                    yes: {
                        style: 'SECONDARY',
                        label: 'Yes remove',
                    },
                    no: {
                        style: 'SECONDARY',
                        label: 'Cancel',
                    },
                }).then(async (confirm) => {
                    if (confirm === 'yes') {
                        await data.delete();
                        interaction.editReply({
                            content: `${client.config.success} Warn has been removed from **${user}** successfully!`,
                        });
                        modLog(interaction, reason, {
                            Action: '`Removed warn`',
                            Member: `${user}`,
                        });
                    }
                    if (confirm === 'no') {
                        interaction.editReply({
                            content: `${client.config.fail} Cancelled!`,
                        });
                    }
                    if (confirm === 'time') {
                        interaction.editReply({
                            content: `${client.config.fail} Cancelling time is up`,
                        });
                    }
                });
            } catch (e) {
                return interaction.reply({
                    content: `${client.config.fail} This is not a valid warn id`,
                });
            }
        }
    },
};
