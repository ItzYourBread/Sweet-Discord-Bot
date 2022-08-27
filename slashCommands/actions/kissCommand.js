const Discord = require("discord.js");
const kisses = require('../../database/actions/kiss.json');

module.exports = {
    name: "kiss",
    usage: '/kiss <user>',
    category: "Actions",
    description: "Kiss your crush!",
    options: [{
        name: "user",
        description: "Select a user.",
        type: "USER",
        required: true
    }, ],
  
    run: async (client, interaction) => {
      
      const Target = interaction.options.getUser('user') || interaction.user;
       
      if (Target.id === interaction.member.id) return interaction.reply({
            content: `ARE YOU SURE? YOU CANNOT KISS YOURSELF EWWWWW YOU BAD BAD BAD!!!`
        });
      
      let kiss = kisses.kiss[Math.floor((Math.random() * kisses.kiss.length))];

      const embed = new Discord.MessageEmbed()

      .setFooter(`${interaction.user.username} kisses ${Target.username} spread more love`)
			.setColor(client.config.embedColor)
			.setImage(`${kiss}`)
      .setAuthor("S:\\client\\commands\\actions\\kiss")

		interaction.reply({ embeds: [embed] });
    },
};