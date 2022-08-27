const moment = require("moment");
const schema = require("../../mongodb/premium/code");
const User = require("../../mongodb/premium/user");

module.exports = {
  name: "removepremium",
  description: `remove preium from user`,
  userPermissions: [],
  category: "Premium",
  options: [
    {
      name: "user",
      description: `mention a premium user`,
      type: "USER",
      required: true,
    },
  ],
  ownerOnly: true,
  run: async (client, interaction, args) => {
   
    let user = interaction.options.getUser("user");
    let data = client.userSettings.get(user.id);
    if (!data.isPremium) {
      return interaction.reply(`${user} is Not a Premium User`);
    } else {
      await User.findOneAndRemove({ Id: user.id });
      await client.userSettings.delete(user.id);
      interaction.reply(`${user} Removed From Premium`);
    }
  },
};
