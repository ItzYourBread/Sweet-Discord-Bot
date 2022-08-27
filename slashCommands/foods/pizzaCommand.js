const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "pizza",
    usage: '/pizza',
    category: "foods",
    description: "Get some spicy pizza photos",
    ownerOnly: false,
    run: async (client, interaction, args) => {
    
    const pizzas = require('../../database/foods/pizza.json');

        let pizza = pizzas.pizza[Math.floor((Math.random() * pizzas.pizza.length))];
        
    let interaction_message = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor("S:\\client\\commands\\foods\\pizza")
          .setTitle(`here is your pizza!`)
          .setURL(`${pizza}`)
          .setImage(`${pizza}`)
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
          content: `This is not your menu, make one by typing /prizza.`,
          ephemeral: true
        });
      if (i.customId === 'refresh-button') {
        await i.deferUpdate();
        const pizzas = require('../../database/foods/pizza.json');

        let pizza = pizzas.pizza[Math.floor((Math.random() * pizzas.pizza.length))];
        return interaction_message.edit({
          embeds: [
            new MessageEmbed()
          .setAuthor("S:\\client\\commands\\foods\\pizza")
          .setTitle(`here you are!`)
          .setURL(`${pizza}`)
          .setImage(`${pizza}`)
          .setColor(client.config.embedColor)
          ]
        });
      }
    });
  }
};