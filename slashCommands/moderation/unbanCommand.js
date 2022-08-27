const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { confirmButtons, modLog } = require('../../handlers/functions');

module.exports = {
    name: 'unban',
    description: 'unbans a member from your server',
    userPerm: ["BAN_MEMBERS"],
    botPerm: ["BAN_MEMBERS"],
    options: [{
            name: "userid",
            description: "user id you want to unban",
            type: "STRING",
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for this unban',
            type: 'STRING',
            required: false
        }
    ],

    run: async (client, interaction) => {
        try {
            const id = interaction.options.getString("userid");
            const reason = interaction.options.getString('reason') || "`No Reason Provided`";
            const user = await client.users.fetch(id);
            const bans = await interaction.guild.bans.fetch()
            const bannedusers = bans.find((b) => b.user.id == id);

            if (!bannedusers) return interaction.reply({
                content: `${client.config.fail} \`${user.tag}\` is not banned`
            })

            const embed = new MessageEmbed()
 
            .setAuthor("S:\\client\\commands\\moderation\\unban")
         .setDescription(`**${interaction.user.tag}** are you sure you want to unban **${user.tag}**?`)
                .setFooter(client.user.tag, client.user.displayAvatarURL())
                .setColor(client.config.embedColor)
                .setTimestamp()

            confirmButtons(interaction, {
                embed: embed,
                othersMessage: `Sorry only <@${interaction.member.id}> can use these buttons`,
                yes: {
                    style: "SECONDARY",
                    label: "Yes Unban!",
                },
                no: {
                    style: "SECONDARY",
                    label: "Cancel",
                }
            }).then(async confirm => {
                if (confirm === "yes") {
                    await interaction.guild.members.unban(user, reason);
                    interaction.editReply({
                        content: `${client.config.success} Unbanned **${user.tag}** successfully!`,
                    });
                    modLog(interaction, reason, {
                        Action: '`Unban`',
                        Member: `\`${user.tag}\``,
                    })
                }
                if (confirm === "no") {
                    interaction.editReply({
                        content: `${client.config.fail} Cancelled unban!`
                    })
                }
                if (confirm === "time") {
                    interaction.editReply({
                        content: `${client.config.fail} Cancelling time is up`
                    })
                }
            })
        } catch (e) {
            return interaction.reply({
                content: `${client.config.fail} This is not a valid user`,
            })
        }
    },
};