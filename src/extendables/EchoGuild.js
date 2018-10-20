const { Guild } = require('../Modules/Index');

class EchoGuild extends Guild {

  constructor(...args) {
    super(...args, { appliesTo: [Guild] });
  }

}

/**
 * An object for the moderation module
 * @type {Object}
 */

EchoGuild.moderation = {
  spam_protect: false,
  swear_filter: {
    enabled: false,
    message: "",
    action: {
      warn: false,
      mute: false,
      kick: false,
      ban: false
    },
    words: []
  },
  bans: {
    dmReason: false,
    actOnSwear: {
      enabled: false,
      message: ""
    },
    delOMsg: false
  },
  kicks: {
    dmReason: false,
    actOnSwear: {
      enabled: false,
      message: ""
    },
    delOMsg: false
  },
  warns: {
    dmReason: false,
    amount2Mute: null,
    amount2Kick: null,
    amount2Ban: null,
    actOnSwear: {
      enabled: false,
      message: ""
    }
  },
  mutes: {
    dmReason: false,
    mRoleID: "",
    actOnSwear: {
      enabled: false,
      time: null,
      reason: "",
      message: ""
    }
  }
};

/**
 * An object for the settings of a guild
 * @type {Object}
 */

EchoGuild.settings = {
  partnered: false,
  lang: "english",
  notifications: false,
  preferEmbeds: false,
  noInvite: false,
  noLink: false,
  prefix: "default",
  logs: {
    action: "",
    warn: "",
    member: ""
  }
};

/**
 * An object containing the music module
 * @type {Object}
 */

EchoGuild.music = {
  volume: 100,
  queue: [],
  song_banlist: {
    enabled: false,
    songs: []
  }
};

module.exports = EchoGuild;
