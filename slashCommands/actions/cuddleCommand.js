const Discord = require("discord.js");
const cuddles = require('../../database/actions/cuddle.json');

module.exports = {
    name: "cuddle",
    usage: '/cuddle <user>',
    category: "Actions",
    description: "cuddle your crush!",
    options: [{
        name: "user",
        description: "Select a user.",
        type: "USER",
        required: true
    }, ],
  
    run: async (client, interaction) => {
      
      const Target = interaction.options.getUser('user') || interaction.user;
        
      if (Target.id === interaction.member.id) return interaction.reply({
            content: `ARE YOU SURE? YOU CANNOT CUDDLE YOURSELF! >.<`
        });
      
      let cuddle = cuddles.cuddle[Math.floor((Math.random() * cuddles.cuddle.length))];

      const embed = new Discord.MessageEmbed()

        
.setFooter(`${interaction.user.username} cuddled ${Target.username}! aww....`)
			.setColor(client.config.embedColor)
			.setImage(`${cuddle}`)
      .setAuthor("S:\\client\\commands\\actions\\cuddle")

		interaction.reply({ embeds: [embed] });
    },
};