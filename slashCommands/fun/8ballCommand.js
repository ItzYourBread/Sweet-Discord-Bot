const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8ball a question.',
    options: [
        {
            name: 'question',
            description: 'A question for the 8ball.',
            type: 'STRING',
            required: true,
        },
    ],
    category: 'fun',
    run: async (client, interaction, args) => {
        const question = interaction.options.getString('question');

        const answers = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes – definitely',
            'You may rely on it',
            'As I see it',
            'Yes',
            'Most Likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy, try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            "Don't count on it",
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful',
            'Sus',
            "You're fucked",
            'It is known',
            'Leave me alone, bruh',
        ];

        const answer = answers[Math.floor(Math.random() * answers.length)];

        const tips = require('../../database/tips.json');
        let tip = tips.tip[Math.floor(Math.random() * tips.tip.length)];

        const embed = new MessageEmbed()
            .setAuthor('S:\\client\\commands\\fun\\8ball')
            .setDescription(
                `You asked the 8ball a question and it answered:\n**Question:** \`${question}\`\n**Answers:** \`${answer}\`
      `
            )
            .setColor(client.config.embedColor);
        interaction.reply({ content: `\ ${tip}`, embeds: [embed] });
    },
};
