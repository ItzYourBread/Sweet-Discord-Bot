const { Client, Collection, Intents } = require('discord.js');
const handler = require("./handlers/index");
const fs = require("fs");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});
const config = require('./config.js');
client.config = config;
const mongoose = require('mongoose');
const Discord = require('discord.js');
const Ascii = require('ascii-table');

// Connect to the database
    mongoose.connect(config.MongoDB, {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`MongoDB Database conected to the server.`)
    }).catch((err) => {
        console.log(`Unable to connect to MongoDB Database.\nError: ` + err )
    })

// Call .env file to get Token
require('dotenv').config()

module.exports = client;

// Global Variables
client.discord = Discord;
client.slash = new Collection();
client.userSettings = new Collection();
client.config = require('./config');

// Records commands and events
handler.loadEvents(client);
handler.loadSlashCommands(client);

// Error Handling

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [Error_Handling] :: Uncaught Exception/Catch (MONITOR)' + err);
});
process.on('multipleResolves', (type, promise, reason) => {
    console.log(' [Error_Handling] :: Multiple Resolves', promise, " reason: ", reason.message);
});


// Login Discord Bot Token
client.login(process.env.TOKEN);
