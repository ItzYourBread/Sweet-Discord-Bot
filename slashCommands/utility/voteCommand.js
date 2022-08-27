const Discord = require("discord.js");

module.exports = {
    name: "vote",
    usage: '/vote',
    category: "utility",
    description: "Help Sweet by voting Sweet on DBL",
    ownerOnly: false,
    run: async (client, interaction) => {

        const row = new client.discord.MessageActionRow()
            .addComponents(
                new client.discord.MessageButton()
                    .setLabel("dbl.com")
                    .setStyle("LINK")
                    .setURL("https://discordbotlist.com/bots/fox/upvote"),
              );

        const embed = new Discord.MessageEmbed()
    .setAuthor("S:\\client\\commands\\utility\\vote")
    .setDescription("You can gain 0.53% chance to win giveaways if you vote sweet!")
    .setColor(client.config.embedColor)
    
      interaction.reply({ embeds: [embed], components: [row] });
    },
};