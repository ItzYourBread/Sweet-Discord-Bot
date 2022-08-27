const User = require("../../mongodb/premium/user");
const moment = require("moment");
const { Collection, MessageEmbed } = require("discord.js");

module.exports = {
  name: "premiumlist",
  description: `get list of all preimium user`,
  userPermissions: [],
  category: "Premium",
  ownerOnly: true,
  run: async (client, interaction, args) => {

    let data = client.userSettings
      .filter((data) => data.isPremium === true)
      .map((data, index) => {
        return ` <@${data.Id}> Expire At :- \`${moment(
          data.premium.expiresAt
        ).format("dddd, MMMM Do YYYY")}\` Plan :- \`${data.premium.plan}\` `;
      });
    interaction.reply({
      embeds: [
        new MessageEmbed().setDescription(
          data.join("\n") || "No Premium User Found"
        ),
      ],
    });
  },
};
