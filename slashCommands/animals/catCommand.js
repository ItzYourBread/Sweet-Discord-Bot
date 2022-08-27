const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "cat",
    usage: '/cat',
    category: "Animals",
    description: "Get some cute cat photos",
    ownerOnly: false,
    run: async (client, interaction, args) => {
    
    const cats = require('../../database/animals/cat.json');

        let cat = cats.cat[Math.floor((Math.random() * cats.cat.length))];
        
    let interaction_message = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor("S:\\client\\commands\\animals\\cat")
          .setTitle(`meowwww......!`)
          .setURL(`${cat}`)
          .setImage(`${cat}`)
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
          content: `This is not your menu, make one by typing /cat.`,
          ephemeral: true
        });
      if (i.customId === 'refresh-button') {
        await i.deferUpdate();
        const cats = require('../../database/animals/cat.json');

        let cat = cats.cat[Math.floor((Math.random() * cats.cat.length))];
        return interaction_message.edit({
          embeds: [
            new MessageEmbed()
          .setAuthor("S:\\client\\commands\\animals\\cat")
          .setTitle(`meow.....again!`)
          .setURL(`${cat}`)
          .setImage(`${cat}`)
          .setColor(client.config.embedColor)
          ]
        });
      }
    });
  }
};