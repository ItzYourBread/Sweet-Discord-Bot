const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "bugreport",
    description: "Report a bug",
    options: [
        {
            type: 'STRING',
            description: 'The bug',
            name: 'bug',
            required: true,
        },
    ],
    run: async (client, interaction, args, message) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const reportCh = client.channels.cache.get('982541148033798144');
        const query = args.join(" ");
        if (!query) return interaction.reply({ content: "Specify a **bug**" });
        const reportEmbed = new MessageEmbed()
            .setAuthor(`S:\\client\\system\\report\\newbug`)
            .setTitle('Bug Report')
            .setDescription(`**Username:** ${member.user.username}\n**User Tag:** ${member.user.tag}\n**User id:** ${member.user.id}\n\n**Message:**
> ${query}`)
            .setFooter(`New bug!`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor("RED")
        interaction.reply({ content: "Thanks for reporting the bug we will approve your report, if you still need help join our discord server: https://discord.gg/KBgdDG9TPc" })
        reportCh.send({ embeds: [reportEmbed] });
    },
};