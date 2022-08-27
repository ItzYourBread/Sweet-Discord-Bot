const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ship",
    usage: '/ship',
    category: "fun",
    description: "Displays love meter between two users.",
    options: [
      {
        name: "user1",
        description: "Select a user.",
        type: "USER",
        required: true
      },
      {
        name: "user2",
        description: "Select a another user.",
        type: "USER",
        required: true
      }
    ],
    ownerOnly: false,
    run: async (client, interaction, args) => {
      
        const user1 = interaction.options.getUser("user1"),
         user2 = interaction.options.getUser("user2");
      
        
        
        let shipPercentage = Math.floor(Math.random()*1000)/10;

        let cAnswer = 'That\'s sad :\'‹'
        if(shipPercentage>=25){cAnswer = 'That\'s not so good combo.'}
        if(shipPercentage>=40){cAnswer = 'Good :з'}
        if(shipPercentage>=70){cAnswer = 'Great combo :0'}
        if(shipPercentage>=90){cAnswer = 'You\'re created for eachother! >w<'}

        const embed = new MessageEmbed()
            .setAuthor("S:\\client\\commands\\fun\\ship")
            .setTitle(`**💗 MATCHMAKING 💗**`)
            .setColor(client.config.embedColor)
            .setImage(`https://api.popcat.xyz/ship?user1${user1.displayAvatarURL({ dynamic: false, format: "png" })}&user2=${user2.displayAvatarURL({ dynamic: false, format: "png" })}`
      )
            .setDescription(`<:arrowdown:976450407243083827> \`${user1.username}\`\n<:arrowup:976450449760739358> \`${user2.username}\`\n\n**Loveing ${shipPercentage}%** ${cAnswer}`)

            interaction.reply({ content: 'aww... ship', embeds: [embed] });
    }
}