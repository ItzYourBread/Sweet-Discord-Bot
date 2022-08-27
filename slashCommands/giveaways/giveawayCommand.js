const manager = require("../../handlers/GiveawayClient");
const ms = require("ms");
const Discord = require("discord.js");
require("moment-duration-format");
const moment = require("moment");

module.exports = {
  name: "giveaway",
  description: `Host a giveaway in your server`,
  category: "Giveaway",
  botPerm: ["MANAGE_CHANNELS", "MANAGE_MESSAGES", "MANAGE_ROLES", "SEND_MESSAGES", "VIEW_CHANNEL", "USE_EXTERNAL_EMOJIS"],
  userPerm: ["MANAGE_MESSAGE"],
  options: [{
    name: 'start',
    description: 'Start a giveaway!',
    type: 'SUB_COMMAND',
    options: [{
      name: "channel",
      description: `The channel to start the giveaway in`,
      type: "CHANNEL",
      required: true,
    }, {
      name: "duration",
      description: `How long the giveaway should last for. Example values: 1m, 1h, 1d`,
      type: "STRING",
      required: true,
    }, {
      name: "winner",
      description: `How many winners the giveaway should have`,
      type: "NUMBER",
      required: true,
    }, {
      name: "prize",
      description: `What the prize of the giveaway should be`,
      type: "STRING",
      required: true,
    }, {
      name: "host",
      description: `Who is hosting the giveaway`,
      type: "USER",
      required: false,
    }]
  }, {
    name: 'reroll',
    description: 'reroll Giveaway in your server',
    type: 'SUB_COMMAND',
    options: [{
      name: "id",
      description: `The giveaway to reroll (message ID)`,
      type: "STRING",
      required: true,
    }]
  }, {
    name: "end",
    description: `end Giveaway in your server`,
    type: 'SUB_COMMAND',
    options: [{
      name: "id",
      description: `The giveaway to end (message ID)`,
      type: "STRING",
      required: true,
    }]
 }],
  run: async (client, interaction, args) => {
      
 if (interaction.options.getSubcommand() === "start") {
    let channel = interaction.options.getChannel("channel");
    let duration = interaction.options.getString("duration");
    let winner = interaction.options.getNumber("winner");
    let prize = interaction.options.getString("prize");
    let host = interaction.options.getUser("host") || `${interaction.member}`;
     
    if(!channel.isText()) {
            return interaction.reply({
                content: `${client.config.fail} Selected channel is not text-based.`,
                ephemeral: true
            });
        }

    manager
      .start(channel, {
        prize: prize,
        duration: ms(duration),
        winnerCount: winner,
        hostedBy: host,
        messages: {
          giveaway: " <:SweetTada:981624346672001124>**Giveaway**<:SweetTada:981624346672001124>",
          giveawayEnded: "<:SweetTada:981624346672001124>**Giveaway Ended**<:SweetTada:981624346672001124>",
          // drawing: "Drawing: {timestamp}",
          // dropMessage: "Be the first to react with 🎉 !",
          // inviteToParticipate: "React with 🎉 to participate!",
          winMessage:
            "Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}",
          // embedFooter: "{this.winnerCount} winner(s)",
          // noWinner: "Giveaway cancelled, no valid participations.",
          // hostedBy: "Hosted by: {this.hostedBy}",
           winners: "Winner(s):",
           endedAt: "Ended at",
           units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: 'hours',
                    days: 'days',
                    pluralS: false
                }
          }          
        })
      .then((s) => {
        interaction.reply(`${client.config.success} Giveaway Started in ${channel}`);
      })
      .catch((e) => {
        console.log(e);
      });
      
 } else if (interaction.options.getSubcommand() === "reroll") {
        
    let ID = interaction.options.getString("id");
    manager
      .reroll(ID, {
        messages: {
          congrat:
            ":tada: New winner: {winners}! Congratulations, you won **{this.prize}**!\n{this.messageURL}",
          error: "No valid entries, no new winner!",
        },
      })
      .then((s) => {
        interaction.reply({ content: `${client.config.success} Giveaway rerolled!`, ephemeral: true });
        })
        .catch((e) => {
        console.log(e);
      });
      
} else if (interaction.options.getSubcommand() === "end") {
    
    let ID = interaction.options.getString("id");
      
    // If no giveaway was found
        if (!manager) {
            return interaction.reply({
                content: `${client.config.fail} Unable to find the giveaway!`,
                ephemeral: true
            });
        }

        if (manager.ended) {
            return interaction.reply({
                content: `${client.config.fail} This giveaway is already ended.`,
                ephemeral: true
            });
        }

    manager.end(ID).then(s => {
        interaction.reply({ content: `${client.config.success} Giveaway ended!`, ephemeral: true });
        })
        .catch((e) => {
        console.log(e);
      });
}

     },
  };