
## [Sweet](https://discord.gg/K4jgjyxb)

Hold giveaways quickly and easily on your Discord server! GiveawayBot is powered by [DiscordInteractions](https://github.com/jagrosh/DiscordInteractions) and [ObjectDB](https://www.objectdb.com/).

## Invite
If you'd like to add **GiveawayBot** to your server, use the following link:<br>
🔗 **https://giveawaybot.party/invite**

## Usage
### Commands  
* **/ghelp** - Shows the available commands
* **/gabout** - Shows information about the bot
* **/ginvite** - Shows a link to add the bot to your server
* **/gcreate** - Interactive giveaway setup
* **/gstart \<time> \<winners> \<prize>** - Starts a new giveaway in the current channel. Users can click the button to enter the giveaway. The time can be in seconds, minutes, hours, or days. Specify the time unit with an "s", "m", "h", or "d", for example `30s` or `2h`.
* **/gend \<giveaway_id>** - Ends a giveaway and picks the appropriate number of winners immediately
* **/gdelete \<giveaway_id>** - Deletes the specified giveaway without picking winners
* **/glist** - Lists currently-running giveaways on the server.
* **/greroll \<giveaway_id>** - Picks a new winner from the specified giveaway. You can also right-click (or long-press on mobile) on an ended giveaway and select Apps > Reroll Giveaway to reroll.
* **/gsettings show** - Shows GiveawayBot's settings on the server. Some settings are set automatically, such as locale.
* **/gsettings set color \<hex_code>** - Sets the color of the embed used for giveaways
* **/gsettings set emoji \<emoji>** - Sets the emoji or text used on the button to enter giveaways

### Buttons  
* Press the button on an active giveaway to enter the giveaway
* Press the giveaway summary button on an ended giveaway to view a summary of a giveaway

---

## Getting Support
If you need help with the bot, please join [GiveawayBot Support](https://discord.gg/giveawaybot).

## Localization
If you'd like to contribute translations, please take a look at the [messages.properties](https://github.com/jagrosh/GiveawayBot/blob/master/src/main/resources/localization/messages.properties) file, as well as other files in the [localization directory](https://github.com/jagrosh/GiveawayBot/blob/master/src/main/resources/localization). Localization files take the form `messages-locale.properties`, for example: `messages-de.properties` for German, or `messages-en-US.properties` for United States English. A list of locales is available [here](https://discord.com/developers/docs/reference#locales).

## Self-Hosting
Self-hosting your own copy of this bot is not supported nor recommended; the source code is provided here so users and other bot developers can see how the bot functions. No help will be provided for editing, compiling, or building any code in this repository, and any changes must be documented as per the [license](https://github.com/jagrosh/GiveawayBot/blob/master/LICENSE).
