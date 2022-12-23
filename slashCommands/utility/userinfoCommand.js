const { Client, MessageEmbed, CommandInteraction } = require('discord.js');
const path = require('path');
const moment = require('moment');
const User = require('../../mongodb/premium/user');

module.exports = {
    name: `userinfo`,
    description: `Get detailed information about a user`,
    usage: `/userinfo <user>`,
    options: [
        {
            name: `user`,
            description: `The user whos information you want`,
            type: `USER`,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const { guild, member, options } = interaction;

        const Target = options.getMember(`user`) || member;

        let user = await User.findOne({
            Id: Target.user.id,
        });

        if (!user) {
            const findUser = await User.findOne({ Id: Target.user.id });
            if (!findUser) {
                const newUser = await User.create({ Id: Target.user.id });
                client.userSettings.set(Target.user.id, newUser);
                user = newUser;
            } else return;
        }

        let acknowledgements = 'None';
        permissions = [];

        if (Target?.permissions?.has('ADMINISTRATOR')) {
            permissions.push('Administrator');
            acknowledgements = 'Administrator';
        }
        if (Target?.permissions?.has('BAN_MEMBERS')) {
            permissions.push('Ban Members');
        }
        if (Target?.permissions?.has('KICK_MEMBERS')) {
            permissions.push('Kick Members');
        }
        if (Target?.permissions?.has('MANAGE_MESSAGES')) {
            permissions.push('Manage Messages');
            acknowledgements = 'Moderator';
        }
        if (Target?.permissions?.has('MANAGE_CHANNELS')) {
            permissions.push('Manage Channels');
        }
        if (Target?.permissions?.has('MENTION_EVERYONE')) {
            permissions.push('Mention Everyone');
        }
        if (Target?.permissions?.has('MANAGE_NICKNAMES')) {
            permissions.push('Manage Nicknames');
        }
        if (Target?.permissions?.has('MANAGE_ROLES')) {
            permissions.push('Manage Roles');
            acknowledgements = 'Administrator';
        }
        if (Target?.permissions?.has('DEAFEN_MEMBERS')) {
            permissions.push('Deafen Members');
            acknowledgements = 'Administrator';
        }
        if (Target?.permissions?.has('MANAGE_WEBHOOKS')) {
            permissions.push('Manage Webhooks');
        }
        if (Target?.permissions?.has('MANAGE_EMOJIS_AND_STICKERS')) {
            permissions.push('Manage Emojis and Stickers');
        }
        if (permissions?.length == 0) {
            permissions.push('No Key Permissions Found');
        }
        if (Target?.id == interaction.guild.ownerId) {
            acknowledgements = 'Server Owner';
        }

        if (Target?.presence?.status === 'online')
            TargetStatus = '<:Online:974780062811455528> Online';
        if (Target?.presence?.status === 'idle')
            TargetStatus = '<:Idle:974780108470616064> Idle';
        if (Target?.presence?.status === 'dnd')
            TargetStatus = '<:DoNotDisturb:974780209540771890> Do Not Disturb';
        if (
            !Target?.presence?.status ||
            Target?.presence?.status === 'undefined'
        )
            TargetStatus = '<:Offline:974780153857208330> Offline';

        if (user && user.isPremium) TargetPremium = 'Activated';
        if (user && !user.isPremium) TargetPremium = 'Poor';

        const roles = guild.members.cache.get(Target?.id)._roles.length;
        let roleList = `None`;
        if (roles > 0)
            roleList = `<@&${guild.members.cache
                .get(Target?.id)
                ._roles.join('>, <@&')}>`;

        if (roleList && roleList.length > 1024) {
            return interaction
                .reply({
                    content: `${process.env.BOT_DENY} \`Role field exceeds 1024 characters\``,
                    ephemeral: true,
                })
                .catch((err) =>
                    console.error(
                        `${path.basename(
                            __filename
                        )} There was a problem sending an interaction: `,
                        err
                    )
                );
        }

        if (acknowledgements && acknowledgements.length > 1024) {
            return interaction
                .reply({
                    content: `\`Acknowledgements field exceeds 1024 characters\``,
                    ephemeral: true,
                })
                .catch((err) =>
                    console.error(
                        `${path.basename(
                            __filename
                        )} There was a problem sending an interaction: `,
                        err
                    )
                );
        }

        if (permissions && permissions.length > 1024) {
            return interaction
                .reply({
                    content: `\`Permissions field exceeds 1024 characters\``,
                    ephemeral: true,
                })
                .catch((err) =>
                    console.error(
                        `${path.basename(
                            __filename
                        )} There was a problem sending an interaction: `,
                        err
                    )
                );
        }

        const tips = require('../../database/tips.json');
        let tip = tips.tip[Math.floor(Math.random() * tips.tip.length)];

        const response = new MessageEmbed()
            .setAuthor('S:\\client\\commands\\utility\\userinfo')
            .setColor(client.config.embedColor)
            .setThumbnail(`${Target?.user.displayAvatarURL({ dynamic: true })}`)
            .addField(
                'Registered:',
                `<t:${parseInt(Target?.user.createdTimestamp / 1000)}:R>`,
                true
            )
            .addField(
                'Joined:',
                `<t:${parseInt(Target?.joinedTimestamp / 1000)}:R>`,
                true
            )

            .addField('Premium:', `${TargetPremium}`, true)
            .addField('Status:', `${TargetStatus}`, true)
            .addField('Roles:', `${roleList}`, false)
            .addField('Acknowledgements:', `${acknowledgements}`, true)
            .addField('Permissions:', `${permissions.join(`, `)}`, false)
            .setFooter({ text: `Id: ${Target?.id}` })
            .setTimestamp();

        if (Target?.user.bot)
            response.addField('Additional:', `This user is a BOT`, false);

        interaction
            .reply({
                content: `\ ${tip}`,
                embeds: [response],
                ephemeral: false,
            })
            .catch((err) =>
                console.error(
                    `${path.basename(
                        __filename
                    )} There was a problem sending an interaction: `,
                    err
                )
            );
    },
};
