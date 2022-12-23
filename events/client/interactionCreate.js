const { admin } = require('../../admin.json');
const User = require('../../mongodb/premium/user');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.slash.get(interaction.commandName);
        if (!command)
            return interaction.reply({
                content:
                    'Awh its a huge error notify our devoloper\nhttps://discord.gg/KBgdDG9TPc',
            });

        if (command.ownerOnly) {
            if (interaction.user.id !== admin) {
                return interaction.reply({
                    content: `This command only can be use by Sweet Admin(s)`,
                    ephemeral: true,
                });
            }
        }

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        interaction.member = interaction.guild.members.cache.get(
            interaction.user.id
        );

        if (!interaction.member.permissions.has(command.userPerm || [])) {
            return interaction.reply({
                content: `${
                    client.config.fail
                } You need \`${command.userPerm.join(', ')}\` Permissions`,
                ephemeral: true,
            });
        }

        if (!interaction.guild.me.permissions.has(command.botPerm || [])) {
            return interaction.reply({
                content: `${client.config.fail} I need \`${command.botPerm.join(
                    ', '
                )}\` Permissions`,
                ephemeral: true,
            });
        }

        if (command) {
            let user = client.userSettings.get(interaction.user.id);
            // If there is no user, create it in the Database as "newUser"
            if (!user) {
                const findUser = await User.findOne({
                    Id: interaction.user.id,
                });
                if (!findUser) {
                    const newUser = await User.create({
                        Id: interaction.user.id,
                    });
                    client.userSettings.set(interaction.user.id, newUser);
                    user = newUser;
                } else return;
            }

            if (command.premium && user && !user.isPremium) {
                interaction.reply(`You are not premium user`);
            } else {
                try {
                    command.run(client, interaction, args);
                } catch (e) {
                    interaction.reply({ content: e.message });
                }
            }
        }
    },
};
