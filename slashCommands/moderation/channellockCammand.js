const { Client, CommandInteraction } = require("discord.js");
const { modLog } = require('../../handlers/functions');

module.exports = {
    name: "channel",
    description: "channel lock/unlock sub commands",
    userPerm: ["MANAGE_CHANNELS"],
    botPerm: ["MANAGE_CHANNELS"],
    options: [{
    name: 'lock',
    description: 'lock a channel',
    type: 'SUB_COMMAND',
    options: [{
      name: "channel",
      description: "channel to lock",
      type: "CHANNEL",
      required: true,
    }, {
      name: 'reason',
      description: 'reason for this lock',
      type: 'STRING',
      required: false
    }]
    }, {
    name: 'unlock',
    description: 'unlock a channel',
    type: 'SUB_COMMAND',
    options: [{
      name: 'channel',
      description: 'channel to unlock',
      type: 'CHANNEL',
      required: true
    }, {
      name: 'reason',
      description: 'reason for this unlock',
      type: 'STRING',
      required: false
    }]
  }],
    run: async (client, interaction) => {

        if (interaction.options.getSubcommand() === "lock") {
            
        const channel = interaction.options.getChannel('channel');
        const reason = interaction.options.getString('reason') || "`No Reason Provided`";

        if (!channel.isText()) {
            return interaction.reply({
                content: `${client.config.fail} Please select a text channel`,
                ephemeral: true
            });
        }
        
        if (channel.permissionsFor(interaction.guild.id).has('SEND_MESSAGES') === false)
            return interaction.reply({
                content: `${client.config.fail} ${channel} is already locked`
            })

        channel.permissionOverwrites.edit(interaction.guild.id, {
            SEND_MESSAGES: false
        })

        interaction.reply({
            content: `${client.config.success} ${channel} locked successfully!`
        })

        modLog(interaction, reason, {
            Action: '`Lock`',
            Channel: `${channel}`,
        })
        } else if (interaction.options.getSubcommand() === "unlock") {
       
        const channel = interaction.options.getChannel('channel');
        const reason = interaction.options.getString('reason') || "`No Reason Provided`";

        if (!channel.isText()) {
            return interaction.reply({
                content: `${client.config.fail} Please select a text channel`,
                ephemeral: true
            });
        }

        if (channel.permissionsFor(interaction.guild.id).has('SEND_MESSAGES') === true)
            return interaction.reply({
                content: `${client.config.fail} ${channel} is not locked`
            })

        channel.permissionOverwrites.edit(interaction.guild.id, {
            SEND_MESSAGES: true
        })

        interaction.reply({
            content: `${client.config.success} ${channel} unlocked successfully!`
        })

        modLog(interaction, reason, {
            Action: '`Unlock`',
            Channel: `${channel}`,
        })
        }
        
    },
};