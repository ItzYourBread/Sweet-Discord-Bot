const { CommandInteraction, MessageEmbed, Client } = require('discord.js')

module.exports = {
  name: 'serverlist',
  description: 'Displays all servers that Sweet is connected to',
  ownerOnly: true,

  run: async (client, interaction, args) => {
    client.guilds.cache.forEach((guild) => {
      interaction.channel.send(`\`${guild.name}\` | ID: \`${guild.id}\``)
    });
  }
}