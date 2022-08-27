const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "cake",
    usage: '/cake',
    category: "foods",
    description: "Get some cute cake photos",
    ownerOnly: false,
    run: async (client, interaction, args) => {
    
    const cakes = require('../../database/foods/cake.json');

        let cake = cakes.cake[Math.floor((Math.random() * cakes.cake.length))];
        
    let interaction_message = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor("S:\\client\\commands\\foods\\cake")
          .setTitle(`here is your yummy cake!`)
          .setURL(`${cake}`)
          .setImage(`${cake}`)
          .setColor(client.config.embedColor)
      ],
      components: [
        new MessageActionRow().addComponents([
          new MessageButton().setLabel('Next').setStyle('PRIMARY').setCustomId('refresh-button')
        ])
      ],
      fetchReply: true
    });
    const collector = await interaction_message.createMessageComponentCollector({
      filter: fn => fn,
      componentType: 'BUTTON'
    });

    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id)
        return i.reply({
          content: `This is not your menu, make one by typing /cake.`,
          ephemeral: true
        });
      if (i.customId === 'refresh-button') {
        await i.deferUpdate();
        const cakes = require('../../database/foods/cake.json');

        let cake = cakes.cake[Math.floor((Math.random() * cakes.cake.length))];
        return interaction_message.edit({
          embeds: [
            new MessageEmbed()
          .setAuthor("S:\\client\\commands\\foods\\cake")
          .setTitle(`here is your cake!`)
          .setURL(`${cake}`)
          .setImage(`${cake}`)
          .setColor(client.config.embedColor)
          ]
        });
      }
    });
  }
};