const discord = require("discord.js");


module.exports = {
    name: "help",
    category: "utility",
    description: "Get help and commands list!",
    ownerOnly: false,
    run: async (client, interaction, args) => {

    let start = Date.now();
    
    let dmMessage = new discord.MessageEmbed()
    .setDescription(`Thanks for using our discord bot, vote us on [Discord bot list](https://discordbotlist.com/bots/fox/upvote) to support Sweet developers and keep the bot alive.\n\nHave a good day!`)
    .setColor(client.config.embedColor)
    
    interaction.user.send({ embeds: [dmMessage] })
        
        let end = Date.now();

        let embed = new discord.MessageEmbed()
     .setAuthor("S:\\client\\commands\\help\\commands")
          .setTitle('')
		      .setDescription('Here is the list of commands!\n[Sweet Hangout](https://discord.gg/XGwc6ZFq) for more help.')
          .addFields(
            { name: "🎖 Rankings", value: '`top` '},
            { name: "🍬 Currency", value: '`balance`, `beg`, `daily`, `shop` '},
            { name: "🥐 Foods", value: '`bread`, `pizza`, `cake`, `milk` '},
            { name: "🐶 Animals", value: '`cat`, `dog` '},
            { name: "😂 Fun", value: '`meme`, `8ball`, `ship`, `dino`'},
            { name: "🎱 Games", value: '`rps` '},
            { name: "🤗 Actions", value: '`hug`, `kiss`, `cuddle`, `slap` '},
            { name: "🎉 Giveaways", value: '`giveaway start`, `giveaway reroll`, `giveaway end` '},
            { name: "👮‍♀️ Moderation", value: '`ban`, `kick`, `warn add`, `warn remove`, `warn check`, `purge`, `timeout`, `unban`, `channel lock`, `channel unlock`, `slowmode` '},
            { name: "⚙️ Server settings", value: "`settings set-modlogs`" },
            { name: "🔧 Utility", value: '`help`, `ping`, `avatar`, `stats`, `weather`, `userinfo`, `serverinfo`, `vote`, `credits` '}
            
          )
          .setFooter(`Have a great day!`)
          .setColor(client.config.embedColor)

       interaction.reply({ embeds: [embed] }).catch((e) => interaction.reply(e));
  },
};