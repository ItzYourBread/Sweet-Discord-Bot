const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "dog",
    usage: '/dog',
    category: "Animals",
    description: "Get some dog photos",
    ownerOnly: false,
    run: async (client, interaction, args) => {
    
    const dogs = require('../../database/animals/dog.json');

        let dog = dogs.dog[Math.floor((Math.random() * dogs.dog.length))];
        
    let interaction_message = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor("S:\\client\\commands\\animals\\dog")
          .setTitle(`wooof......!`)
          .setURL(`${dog}`)
          .setImage(`${dog}`)
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
          content: `This is not your menu, make one by typing /dog.`,
          ephemeral: true
        });
      if (i.customId === 'refresh-button') {
        await i.deferUpdate();
        const dogs = require('../../database/animals/dog.json');

        let dog = dogs.dog[Math.floor((Math.random() * dogs.dog.length))];
        return interaction_message.edit({
          embeds: [
            new MessageEmbed()
          .setAuthor("S:\\client\\commands\\animals\\dog")
          .setTitle(`wooof.....again!`)
          .setURL(`${dog}`)
          .setImage(`${dog}`)
          .setColor(client.config.embedColor)
          ]
        });
      }
    });
  }
};