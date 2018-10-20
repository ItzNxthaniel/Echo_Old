const { Structures, Guild } = require('../Modules/Index');

module.exports = Structures.extend("Guild", () => class EchoGuild extends Guild {

  constructor(gid) {
    super("EchoGuild");

    /**
     * The guild itself
     * @type {String}
     */
    this.gid = gid;

    /**
     * A object containing the music module
     * @type {Object}
     */

    this.music = {
      volume: 100,
      queue: [],
      song_banlist: {
        enabled: false,
        songs: []
      }
    };

    /**
     * A object for the moderation module
     * @type {Object}
     */

    this.moderation = {
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
     * A object for the settings of a guild
     * @type {Object}
     */

    this.settings = {
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
  }

});
