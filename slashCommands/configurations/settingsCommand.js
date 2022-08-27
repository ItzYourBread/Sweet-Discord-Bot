const { Client, CommandInteraction } = require("discord.js");
const modLogModel = require('../../mongodb/models/modlogs');

module.exports = {
    name: "settings",
    description: "Server settings",
    userPerm: ["MANAGE_CHANNELS", "SEND_MESSAGES", "MANAGE_GUILD"],
    botPerm: ["MANAGE_CHANNELS", "SEND_MESSAGES", "MANAGE_GUILD"],
    options: [{
    name: 'set-modlogs',
    description: 'moderation logs channel',
    type: 'SUB_COMMAND',
    options: [{
      name: "channel",
      description: `Select a channel where Sweet send modlogs messages`,
      type: "CHANNEL",
      required: true,
    }]
 }],
    run: async (client, interaction) => {

 if (interaction.options.getSubcommand() === "set-modlogs") {
     
        const channel = interaction.options.getChannel('channel');

        if (!channel.isText()) {
            return interaction.reply({
                content: `${client.config.fail} Please select a text channel`,
                ephemeral: true
            });
        }

        const data = await modLogModel.findOne({
            Guild: interaction.guildId
        })
        if (data) data.delete();
        new modLogModel({
            Guild: interaction.guildId,
            Channel: channel.id,
        }).save();

        interaction.reply({
            content: `${client.config.success} Logs have been set to ${channel}`    
        })
 }
    },
};