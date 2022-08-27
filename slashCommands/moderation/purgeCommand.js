const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { modLog } = require('../../handlers/functions');

module.exports = {
    name: 'purge',
    description: 'deletes messages',
    userPerm: ["MANAGE_MESSAGES"],
    botPerm: ["MANAGE_MESSAGES"],
    options: [{
            name: "amount",
            description: "Select the amount messages to delete",
            type: "INTEGER",
            required: true
        },
        {
            name: "channel",
            description: "channel to delete messages",
            type: "CHANNEL",
            required: false
        },
        {
            name: "user",
            description: "Select a user to clear their messages",
            type: "USER",
            required: false
        },
        {
            name: "reason",
            description: "reason for this purge",
            type: "STRING",
            required: false
        }
    ],

    run: async (client, interaction) => {

        const channel = interaction.options.getChannel("channel") || interaction.channel;
        const member = interaction.options.getMember("user");
        const amount = interaction.options.getInteger('amount');
        const reason = interaction.options.getString('reason') || "`No Reason Provided`";

        if (amount < 0 || amount > 100)
            return interaction.reply({
                content: `${client.config.fail} You can only delete 100 messages at once`,
            })

        if (!channel.isText())
            return interaction.reply({
                content: `${client.config.fail} Please select a text channel`
            });

        let messages;
        if (member) {
            messages = (await channel.messages.fetch({
                limit: amount
            })).filter(m => m.member.id === member.id);
        } else messages = amount;

        if (messages.size === 0) {
            return interaction.reply({
                content: `${client.config.fail} Unable to find any messages from ${member}`,
            })
        } else {
            await channel.bulkDelete(messages, true).then(messages => {
                const embed = new MessageEmbed()
                    
                .setAuthor("S:\\client\\commands\\moderation\\purge")
                .setDescription(`
                    Successfully deleted **${messages.size}** messages.
                  `)
                    .addField('Channel', `${channel}`, true)
                    .addField('Message Count', `\`${messages.size}\``, true)
                    .addField('Reason', `${reason}`, true)
                    .setTimestamp()
                    .setColor(client.config.embedColor);

                if (member) {
                    embed
                        .spliceFields(1, 1, {
                            name: 'Found Messages',
                            value: `\`${messages.size}\``,
                            inline: true
                        })
                        .spliceFields(1, 0, {
                            name: 'Member',
                            value: `${member}`,
                            inline: true
                        });
                }
                interaction.reply({
                    embeds: [embed]
                }).catch(() => {});
            })
        }

        const fields = {
            Action: '`Purge Messages`',
            Channel: `${channel}`
        };

        if (member) {
            fields['Member'] = `${member}`;
            fields['Found Messages'] = `\`${messages.size}\``;
        } else fields['Message Count'] = `\`${amount}\``;

        modLog(interaction, reason, fields);
    },
};