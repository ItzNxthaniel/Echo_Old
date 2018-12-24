/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { token, l_link, Client, Schema, PlayerManager } = require('./Modules/Index.js');

const options = {
  // KlasaClient Options
  production: true,
  ownerIDs: [
    "147891648628654082", // Goom
    "295391820744228867", // Dwiggy
    "296862433136476160" // TheFloppyBanana
  ],
  ownerID: "147891648628654082", // Goom
  hubID: "406966876367749131",
  commandEditing: true,
  commandLogging: true,
  noPrefixDM: true,
  prefix: "e:",
  providers: {
    default: 'rethinkdb'
  },
  gateways: {
    guilds: { provider: 'rethinkdb' },
    users: { provider: 'rethinkdb' },
    clientStorage: { provider: 'rethinkdb' }
  },
  pieceDefaults: {
    commands: {
      cooldown: 1
    }
  },

  // Discord.js Options
  fetchAllMembers: false,
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
  TestersOnly: true,
  Testers: [
    "147891648628654082", // Goom
    "295391820744228867", // Dwiggy
    "296862433136476160", // TheFloppyBanana
    "184837412629774336", // Jason
    "186508579035938816", // Hacker
    "394697144252235805" // Kevlar
  ],
  Version: {
    Number: "V2.0.0_PRE-ALPHA",
    Name: "Raven"
  },
  Colors: {
    randomColor: parseInt(`0x${Math.floor(Math.random() * 16777215).toString(16)}`)
  },

  nodes: [{ host: l_link.host, port: l_link.port, password: l_link.password }]
};

class Echo extends Client {

  constructor(...args) {
    super(...args);

    Echo.defaultClientSchema
      .add('restart', restart => restart
        .add('channel', 'textchannel')
        .add('timestamp', 'number'));

    Echo.defaultGuildSchema
      .add('notifications', 'boolean', { default: false, configurable: false })
      .add('preferEmbeds', 'boolean', { default: false })
      .add('partner', partner => partner
        .add('status', 'boolean', { default: false, configurable: false })
        .add('serverid', 'string', { default: '', configurable: false })
        .add('msgid', 'string', { default: '', configurable: false })
        .add('ownerid', 'string', { default: '', configurable: false })
        .add('channelid', 'string', { default: '', configurable: false })
        .add('msginfo', msginfo => msginfo
          .add('title', 'string', { default: "NaN", configurable: false })
          .add('description', 'string', { default: "NaN", configurable: false })
          .add('thumbnail', 'string', { default: "NaN", configurable: false })
          .add('link', 'string', { default: "NaN", configurable: false })))
      .add('logs', logs => logs
        .add('action', 'string', { default: '' })
        .add('warn', 'string', { default: '' })
        .add('member', 'user', { configurable: true }))
      .add('music', music => music
        .add('volume', 'number', { default: 100 })
        .add('queue', 'string', { default: [], array: true, configurable: false })
        .add('song_banlist', banlist => banlist
          .add('enabled', 'boolean', { default: false })
          .add('songs', 'string', { default: [], array: true, configurable: false }))
        .add('bound', bound => bound
          .add('setOnJoin', 'boolean', { default: false, configurable: false })
          .add('chnID', 'string', { default: '', configurable: false })))
      .add('roles', roles => roles
        .add('dj', 'string', { default: '', configurable: false }))
      .add('moderation', moderation => moderation
        .add('bans', bans => bans
          .add('dmReason', 'boolean', { default: false })
          .add('delOMsg', 'boolean', { default: false })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false })
            .add('message', 'string', { default: '' })))
        .add('kicks', kicks => kicks
          .add('dmReason', 'boolean', { default: false })
          .add('delOMsg', 'boolean', { default: false })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false })
            .add('message', 'string', { default: '' })))
        .add('warns', warns => warns
          .add('dmReason', 'boolean', { default: false })
          .add('amount2Mute', 'any', { default: null, configurable: false })
          .add('amount2Kick', 'any', { default: null, configurable: false })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false })
            .add('message', 'string', { default: '' })))
        .add('mutes', mutes => mutes
          .add('dmReason', 'boolean', { default: false })
          .add('mRoleID', 'role', { default: '' })
          .add('actOnSwear', act => act
            .add('enabled', 'boolean', { default: false })
            .add('time', 'integer', { default: null, configurable: false })
            .add('reason', 'string', { default: '' })
            .add('message', 'string', { default: '' }))))
      .add('automod', automod => automod
        .add('noInvite', 'boolean', { default: false })
        .add('noLink', 'boolean', { default: false })
        .add('spam_protect', 'boolean', { default: false })
        .add('swear_filter', filter => filter
          .add('enabled', 'boolean', { default: false })
          .add('message', 'string', { default: '' })
          .add('words', 'string', { default: [], array: true })
          .add('action', action => action
            .add('warn', 'boolean', { default: false })
            .add('mute', 'boolean', { default: false })
            .add('kick', 'boolean', { default: false })
            .add('ban', 'boolean', { default: false }))))
      .add('reaction_roles', reaction_roles => reaction_roles
        .add('enabled', 'boolean', { default: false })
        .add('msgID', 'string', { default: '' })
        .add('roles', roles => roles));

    Echo.defaultPermissionLevels
      .add(7, ({ member }) => member && member.permissions.has('ADMINISTRATOR'))
      .add(8, ({ member, author, guild }) => member && author.id === guild.ownerID)
      .add(9, ({ author }) => options.ownerIDs.includes(author.id))
      .add(10, ({ author }) => options.ownerID === author.id);
  }

  async debug() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(`[Shard ${Echo.options.shardId}]`);
    console.log.apply(console, args);
  }

  async _initplayer() {
    this.player = new PlayerManager(this, options.nodes, {
			user: this.user.id,
			shards: this.options.shardCount
		});
  }

}

const EchoClient = new Echo(options);

EchoClient.gateways.register('donations', {
  provider: 'rethinkdb',
  schema: new Schema()
    .add('guildID', 'string', { default: '', configurable: false })
    .add('hasDonated', 'boolean', { default: false, configurable: false })
    .add('paymentType', 'string', { default: "none", configurable: false })
    .add('paymentPlan', 'string', { default: "none", configurable: false })
    .add('planPurchasedDate', 'string', { default: "none", configurable: false })
    .add('paymentAuthCode', 'string', { default: "none", configurable: false })
    .add('gifted', gifted => gifted
      .add('wasGifted', 'boolean', { default: false, configurable: false })
      .add('gifterUserID', 'string', { default: '', configurable: false })
      .add('giftMessage', 'string', { default: "No Message Provided.", configurable: false }))
});

module.exports = Echo;

EchoClient.login(token);
