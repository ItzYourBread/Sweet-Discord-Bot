const { CommandInteraction, Client } = require('discord.js');
const ms = require('ms');


module.exports = {
    name: 'dino',
    description: '🦖 Dino is more fun!',
    category: "fun",
    usage: "/dino",

    run: async(client, interaction, args) => {
        let msg = await interaction.reply(`-----------------🦖`)
        let time = 1 * 1000

        setTimeout(function () {
            interaction.editReply(`-----------🦖-----`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`----------🦖-------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`--------🦖---------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`------🦖-----------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`-------🦖-----------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`---🌵-----🦖---------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`---🌵-🦖--------------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`ㅤ🦖\n\n ---🌵--------------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`🦖\n ---🌵--------------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`------🦖---🌵--------------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`----🦖-----🌵----------------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`-🌵🌵-----🦖-------🌵--------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`----🌵🌵-🦖----------🌵------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`ㅤ🦖\n\n ---🌵🌵-------------🌵---`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`🦖\n ---🌵🌵-------------🌵---`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`-----🦖---🌵🌵-------------🌵--`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`🎂----🦖--------🌵🌵-----------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`---🎂--🦖----------🌵🌵---------`)
        }, time)
        time += 1.5 * 1000

        setTimeout(function () {
            interaction.editReply(`<a:793364759101571072:862859342919368766>  **Complete**! <a:793364759101571072:862859342919368766>\n ---🎂🦖----------🌵🌵-------------`)
        }, time)
    },
}