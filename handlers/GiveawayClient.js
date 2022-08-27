const { GiveawaysManager, Giveaway } = require("discord-giveaways");
const { MessageEmbed, Interaction } = require("discord.js");
const Enmap = require("enmap");
const client = require("../index.js");
const giveawayDB = new Enmap({ name: "giveaways" });
const ms = require("ms");
const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');


const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return giveawayDB.fetchEverything().array();
  }
  async saveGiveaway(messageId, giveawayData) {
    giveawayDB.set(messageId, giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    giveawayDB.set(messageId, giveawayData);
    return true;
  }

  async deleteGiveaway(messageId) {
    giveawayDB.delete(messageId);
    return true;
  }

  async refreshStorage() {
    return client.shard.broadcastEval(() =>
      this.giveawaysManager.getAllGiveaways()
    );
  }
  /**
   * @param {Giveaway} giveaway
   */
  generateMainEmbed(giveaway) {
      
      const duration = moment
        .duration(giveaway.remainingTime)
        .format("D[d], H[h], m[m], s[s]");

    let mainEmbed = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setTitle(`<:SweetGift:980949624921657424> **${giveaway.prize}** Giveaway`)
      .setDescription(
        `>>> **Winner:** ${giveaway.winnerCount}\n**Hosted by:** ${giveaway.hostedBy}\nTime Remaining: ${duration}\n\n[Invite me!](https://discord.com/oauth2/authorise?client_id=814151198054547506&permissions=1240108362998&scope=applications.commands%20bot) | [Support](https://discord.gg/KBgdDG9TPc) | [Vote me to get 0.53% chance to win the giveaway](https://discordbotlist.com/bots/fox/upvote)`
      )
      .setImage(`https://media.discordapp.net/attachments/984777201805299733/985979019466010634/0C618A02-605B-4E40-820A-1B8D81F6151F.png`)
      .setFooter(`${giveaway.winnerCount} Winner | Ends at`)
      .setTimestamp(giveaway.endAt)
    
    return mainEmbed;
  }

    generateEndEmbed(giveaway, winners) {

    let endEmbed = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setTitle(`<:SweetGift:980949624921657424> **${giveaway.prize}** Giveaway Ended`)
      .setDescription(
        `>>> **Winner:**\n${winners}\n**Hosted by:**\n${giveaway.hostedBy}\n\n[Invite me!](https://discord.com/oauth2/authorize?client_id=814151198054547506&permissions=1240108362998&scope=applications.commands%20bot) | [Support](https://discord.gg/KBgdDG9TPc) | [Vote me](https://discordbotlist.com/bots/fox/upvote)`
      )
      .setFooter(`Ended at`)
      .setTimestamp(giveaway.endAt)
    
    return endEmbed;
  }
            
 generateNoValidParticipantsEndEmbed(giveaway) {

    let NoValidParticipantsEndEmbed = new MessageEmbed()
      .setColor(client.config.embedColor)
      .setTitle(`<:SweetGift:980949624921657424> **${giveaway.prize}** Giveaway Ended`)
      .setDescription(
        `>>> Giveaway cancelled, no valid entries\n**Hosted by:**\n${giveaway.hostedBy}\n\n[Invite me!](https://discord.com/oauth2/authorize?client_id=814151198054547506&permissions=1240108362998&scope=applications.commands%20bot) | [Support](https://discord.gg/KBgdDG9TPc) | [Vote me](https://discordbotlist.com/bots/fox/upvote)`
      )
      .setFooter(`Ended at`)
      .setTimestamp(giveaway.endAt)
    
    return NoValidParticipantsEndEmbed;
    }
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
  updateCountdownEvery: 20000,
  default: {
    botsCanWin: false,
    embedColor: client.config.embedColor,
    reaction: "🎉",
  },
});

module.exports = manager;

manager.on("giveawayReactionAdded", async (giveaway, reactor, messageReaction) => {
  let approved =  new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#FFC1C1")
    .setTitle("Giveaway Entry Approved!")
    .setDescription(
      `Your entry to [${giveaway.prize}!](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been approved!\n\n[Vote](https://discordbotlist.com/bots/fox/upvote) | [Sweet’s Hangout](https://discord.gg/KBgdDG9TPc) | Vote us on [DBL](https://discordbotlist.com/bots/fox/upvote) to get 0.53% chance to win the giveaway`
    )
    .setTimestamp()
    .setFooter(`Sweet Giveaway System`);
    
    return reactor.send({
          embeds: [approved],
          content: "**Sweet’s Hangout:** https://discord.gg/KBgdDG9TPc"
        }).catch(e => {})
});