/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { token, Client } = require('./Modules/Index.js');

const options = {
  // KlasaClient Options
  production: true,
  ownerIDs: [
    "147891648628654082", // Goom
    "295391820744228867", // Dwiggy
    "296862433136476160", // TheFloppyBanana
    "362315641161515008" // Vistril
  ],
  ownerID: "147891648628654082", // Goom
  commandEditing: true,
  commandLogging: true,
  typing: true,
  noPrefixDM: true,
  prefix: "e:",
  providers: {
    default: 'mongodb'
  },
  gateways: {
    guilds: { provider: 'mongodb' },
    users: { provider: 'mongodb' },
    clientStorage: { provider: 'mongodb' }
  },
  pieceDefaults: {
    commands: {
      cooldown: 1
    }
  },

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
  inDevelopment: true,
  TestersOnly: false,
  Version: {
    Number: "V2.0.0_PRE-ALPHA",
    Name: "Raven"
  }
};

class Echo extends Client {

  constructor(...args) {
    super(...args);

    Echo.defaultGuildSchema
      .add('automod', automod => automod
        .add('noInvite', 'boolean', { default: false, configurable: true })
        .add('noLink', 'boolean', { default: false, configurable: true })
        .add('spam_protect', 'boolean', { default: false, configurable: true })
        .add('swear_filter', filter => filter
          .add('enabled', 'boolean', { default: false, configurable: true })
          .add('message', 'string', { default: '', configurable: true })
          .add('words', 'string', { default: [], array: true, configurable: true })
          .add('action', action => action
            .add('warn', 'boolean', { default: false, configurable: true })
            .add('mute', 'boolean', { default: false, configurable: true })
            .add('kick', 'boolean', { default: false, configurable: true })
            .add('ban', 'boolean', { default: false, configurable: true }))))
      .add('partner', partner => partner
        .add('partnered', 'boolean', { default: true, configurable: false }))
        .add('serverid', 'string', { default: "0", configurable: false })
        .add('msgid', 'string', { default: '0', configurable: false })
      .add('notifications', 'boolean', { default: false, configurable: false })
      .add('preferEmbeds', 'boolean', { default: false, configurable: true })
      .add('logs', logs => logs
        .add('action', 'string', { default: '', configurable: true })
        .add('warn', 'string', { default: '', configurable: true })
        .add('member', 'user', { configurable: true }))
      .add('music', music => music
        .add('volume', 'number', { default: 100, configurable: true })
        .add('queue', 'string', { default: [], array: true, configurable: false })
        .add('song_banlist', banlist => banlist
          .add('enabled', 'boolean', { default: false, configurable: true })
          .add('songs', 'string', { default: [], array: true, configurable: false })))
      .add('moderation', moderation => moderation
        .add('bans', bans => bans
          .add('dmReason', 'boolean', { default: false, configurable: true })
          .add('delOMsg', 'boolean', { default: false, configurable: true })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false, configurable: true })
            .add('message', 'string', { default: '', configurable: true })))
        .add('kicks', kicks => kicks
          .add('dmReason', 'boolean', { default: false, configurable: true })
          .add('delOMsg', 'boolean', { default: false, configurable: true })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false, configurable: true })
            .add('message', 'string', { default: '', configurable: true })))
        .add('warns', warns => warns
          .add('dmReason', 'boolean', { default: false, configurable: true })
          .add('amount2Mute', 'any', { default: null, configurable: false })
          .add('amount2Kick', 'any', { default: null, configurable: false })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false, configurable: true })
            .add('message', 'string', { default: '', configurable: true })))
        .add('mutes', mutes => mutes
          .add('dmReason', 'boolean', { default: false, configurable: true })
          .add('mRoleID', 'role', { default: '', configurable: true })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false, configurable: true })
            .add('time', 'integer', { default: null, configurable: false })
            .add('reason', 'string', { default: '', configurable: true })
            .add('message', 'string', { default: '', configurable: true }))));

    Echo.defaultPermissionLevels
      .add(8, (client, msg) => msg.member && msg.member.permissions.has('ADMINISTRATOR'))
      .add(9, (client, msg) => options.ownerIDs.includes(msg.author.id))
      .add(10, (client, msg) => options.ownerID === msg.author.id);
  }

  get randomColor() {
    return parseInt(`0x${Math.floor(Math.random() * 16777215).toString(16)}`);
  }

  async debug() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(`[Shard ${Echo.options.shardId}]`);
    console.log.apply(console, args);
  }

}

module.exports = Echo;

new Echo(options).login(token);
