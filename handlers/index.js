const fs = require('fs');
const chalk = require('chalk');

/**
 * Load Events
 */
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync('./events');
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`./events/${folder}`)
            .filter((file) => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);

            if (event.name) {
                console.log(`Event ${file} is being loaded `);
            } else {
                console.log(
                    `❌ Event ${file} missing a help.name or help.name is not in string `
                );
                continue;
            }

            if (event.once) {
                client.once(event.name, (...args) =>
                    event.execute(...args, client)
                );
            } else {
                client.on(event.name, (...args) =>
                    event.execute(...args, client)
                );
            }
        }
    }
};

/**
 * Load SlashCommands
 */
const loadSlashCommands = async function (client) {
    let slash = [];

    const commandFolders = fs.readdirSync('./slashCommands');
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`./slashCommands/${folder}`)
            .filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../slashCommands/${folder}/${file}`);

            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command);
                console.log(`SlashCommand ${file} is being loaded `);
            } else {
                console.log(
                    `❌ SlashCommand ${file} missing a help.name or help.name is not in string `
                );
                continue;
            }
        }
    }

    client.on('ready', async () => {
        // Register Slash Commands for a single guild
        // await client.guilds.cache
        //    .get("YOUR_GUILD_ID")
        //    .commands.set(slash);

        // Register Slash Commands for all the guilds
        await client.application.commands.set([]);
    });
};

module.exports = {
    loadEvents,
    loadSlashCommands,
};
