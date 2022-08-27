const Discord = require("discord.js");
const slaps = require('../../database/actions/slap.json');

module.exports = {
    name: "slap",
    usage: '/slap <user>',
    category: "Actions",
    description: "Slap your enemy!",
    options: [{
        name: "user",
        description: "Select a user.",
        type: "USER",
        required: true
    }, ],
  
    run: async (client, interaction) => {
      
      const Target = interaction.options.getUser('user') || interaction.user;
        
      if (Target.id === interaction.member.id) return interaction.reply({
            content: `YOU REALLY A MAD GUY!!!!!!`
        });
        
      if (Target.id === "943855772415193118") return interaction.reply({
            content: `You can't slap me\n\n*Note:*\nDo not slap or abuse Sweet or else we have to ban you from Sweet, Be careful.`
        });
      
      let slap = slaps.slap[Math.floor((Math.random() * slaps.slap.length))];

      const embed = new Discord.MessageEmbed()

      .setFooter(`Ouch ${interaction.user.username} slapped ${Target.username}! 😣`)
			.setColor(client.config.embedColor)
			.setImage(`${slap}`)
      .setAuthor("S:\\client\\commands\\actions\\slap")

		interaction.reply({ embeds: [embed] });
    },
};