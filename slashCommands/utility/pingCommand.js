const discord = require("discord.js");


module.exports = {
    name: "ping",
    category: "utility",
    description: "Check the sweet's ping!",
    ownerOnly: false,
    run: async (client, interaction, args) => {

    let start = Date.now();

    let embed1 = new discord.MessageEmbed()
    .setDescription("pinging.......")
    .setColor(client.config.embedColor)

    await interaction.reply({
        embeds: [embed1]
      })
        let end = Date.now();

        const tips = require('../../database/tips.json');
let tip = tips.tip[Math.floor((Math.random() * tips.tip.length))];

        let embed = new discord.MessageEmbed()
          .setAuthor("S:\\client\\commands\\utility\\ping")
          .setTitle('Pong!')
			
			.setDescription(
				`⌛ Latency is ${Math.round(client.ws.ping)}ms,\n⏲️ API Ping is ${Math.round(client.ws.ping)}`,
			)
            .setColor(client.config.embedColor)

       interaction.editReply({ content: `\ ${tip}`, embeds: [embed] }).catch((e) => interaction.followUp(e));
  },
};