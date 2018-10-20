/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { token, Client } = require('./Modules/Index.js');

class Echo extends Client {
  constructor(...args) {
    super(...args, {
      // KlasaClient Options
      production: true,
      ownerIDs: [
        "147891648628654082", // Goom
        "295391820744228867", // Dwiggy
        "296862433136476160", // TheFloppyBanana
        "362315641161515008" // Vistril
      ],
      commandEditing: true,
      commandLogging: true,
      typing: true,
      noPrefixDM: true,
      prefix: "e:",

      // Discord.js Options
      fetchAllMembers: true,
      disableEveryone: true,

      // Custom Options
      playingS: [
        { title: "with your feelings!", type: "PLAYING" },
        { title: "with dogs!", type: "PLAYING" },
        { title: "Simon Says!", type: "PLAYING" },
        { title: "I Spy!", type: "PLAYING" },
        { title: "with chess pieces!", type: "PLAYING" },
        { title: "with Goomig!", type: "PLAYING" },
        { title: "with a rubber duck!", type: "PLAYING" },
        { title: "your complaints!", type: "LISTENING" },
        { title: "your movements!", type: "WATCHING" },
        { title: "as Big Brother!", type: "PLAYING" },
        { title: "Stranger Things!", type: "WATCHING" },
        { title: "Crunchyroll!", type: "WATCHING" },
        { title: "Spotify!", type: "LISTENING" },
        { title: "your commands!", type: "LISTENING" },
        { title: "your demands!", type: "LISTENING" },
        { title: "FM Radio!", type: "LISTENING" },
        { title: "nervous users!", type: "LISTENING" },
        { title: "users nervously!", type: "LISTENING" },
        { title: "e$help || e:help", type: "PLAYING" },
        { title: "my gears creak!", type: "LISTENING" },
        { title: "with my database!", type: "PLAYING" },
        { title: "my database!", type: "LISTENING" },
        { title: "the database!", type: "WATCHING" }
      ],
      helpMsgs: [
        /* Goomig */
        "Help is flying through the sky, into your DMs!", "Help is sliding on ice, into your DMs!", "Whoops, Slip, SQUASH THAT REQUEST FOR HELP HERE I COME!",
        /* Dwigoric */
        "Sending 911 under your doormat!", "Delivering the savory pizza in front of your door!", "Sending angels into your mailbox!", "Hooman, I have heeded your request for help.", "So help me God", "Helping you get out of your problems...", "Magic stones, ye say? Right here under the kilt.", "Helping you escape the shadow realm...", "Let me check that I have this right...", "I am really sorry to hear that. Is there anything I can do to do for your request for help?", "That is a good question. Find it out yourself.", "I'm not sure, but don't ask me for help.", "I'm sorry, I don't have the information on that. May I put you on hold for a few minutes? I will clarify this with our manager.", "I'm sorry, this question would be out of my expertise, but Daniel from the tech support department will be able to help you. Would you like me to connect you with him?", "May I put your call on hold while I am checking your order?", "I'm sorry, Echo is not available right now. May I help you with something?", "I'm sorry, we don't have this feature at the moment. We do intend to add it to our service and we can notify you when it has been done. Would you like to receive an email update?",
        /* Wistful */
        "YA NEED HELP?",
        /* Fiery_Hacker */
        "Bringing in the reinforcements..."
      ],
      randomColor: parseInt(`0x${Math.floor(Math.random() * 16777215).toString(16)}`),
      inDevelopment: true,
      TestersOnly: false,
      Version: {
        Number: "V2.0.0_PRE-ALPHA",
        Name: "Raven"
      }
    })
  }
}

Echo.debug = function () {
  const args = Array.prototype.slice.call(arguments);
  args.unshift(`[Shard ${Echo.options.shardId}]`);
  console.log.apply(console, args);
};

module.exports = Echo;

// client.mongo = new MongoDB(client);
new Echo.login(token);


/*
  if (!client.mongo) return prefix;
    
  try {
    console.log("Fetching Prefix");
    if (!m.guild) return prefix;
    const data = await client.mongo.fetchGuild(m.guild.id);
    if (data.settings.prefix == "default") return prefix;
    else return data.settings.prefix;
  } catch (e) {
    console.error(`Error Fetching Prefix`, e);
    return prefix;
  }
*/
