const discord = require("discord.js");


module.exports = {
    name: "credits",
    category: "utility",
    description: "Credit list!",
    ownerOnly: false,
    run: async (client, interaction, args) => {

    await interaction.reply({
        content: `Loading...`
      })

        let embed = new discord.MessageEmbed()
     .setAuthor("S:\\client\\commands\\utility\\credits")
          .setTitle('Sweet Credits')
		  .setDescription(`**1.** Arif | The Founder of Sweet and the Sweet developer`)
          .setFooter({ text: "Powered by Satify", iconURL: "https://media.discordapp.net/attachments/945710533515046932/1005088660246499348/E15430D2-BB8A-4927-9526-E102125CE4D1.png"})
          .setColor(client.config.embedColor)

       interaction.editReply({ content: ` \  `, embeds: [embed] })
  },
};
