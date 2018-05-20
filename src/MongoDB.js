const { MongoClient } = require("mongodb");
const { mongo } = require("./Data/Tokens.js");
const _ = require("lodash");

class DefaultServer {
  constructor(gid) {
    this.gid = gid;
    this.music = {
      volume: 100,
      queue: [],
      song_banlist: {
        enabled: false,
        songs: []
      }
    };
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
        dmr: false,
        actOnSwear: {
          enabled: false,
          message: ""
        },
        delOMsg: false
      },
      kicks: {
        dmr: false,
        actOnSwear: {
          enabled: false,
          message: ""
        },
        delOMsg: false
      },
      warns: {
        dmr: false,
        am2Mute: null,
        am2Kick: null,
        am2Ban: null,
        actOnSwear: {
          enabled: false,
          message: ""
        }
      },
      mutes: {
        dmr: false,
        mRoleID: "",
        actOnSwear: {
          enabled: false,
          time: null,
          reason: "",
          message: ""
        }
      }
    };
    this.events = {
      join: {
        message: {
          enabled: false,
          channel: "",
          message: ""
        },
        role: {
          enabled: false,
          channel: "",
          roleID: ""
        },
        botRole: {
          enabled: false,
          channel: "",
          roleID: ""
        }
      },
      leave: {
        message: {
          enabled: false,
          channel: "",
          message: ""
        }
      }
    };
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
        warn: ""
      }
    };
  }
}

class DefaultMute {
  constructor(uid, gid) {
    this.uid = uid;
    this.gid = gid;
    this.muteInfo = {
      time: null,
      reason: null,
      type: null
    };
  }
}

class MongoDB {
  constructor(client) {
    this.bot = client;
    this.client = null;
    this.collections = {};
    this.db = null;
    this.DefaultServer = DefaultServer;
    this.connect();
  }
  async connect() {
    console.log("Database connecting...");
    try {
      this.client = await MongoClient.connect(this.build(), null);
    } catch (e) {
      return console.error(e);
    }
    console.log("Database connected.");
    this.db = this.client.db(mongo.database);
    console.log(`Database ${mongo.database} selected.`);

    this.db.on("close", mongoError => {
      console.error("Database Randomly Closed");
      if (mongoError) console.error(`Error: ${mongoError.stack}`);
    });
    this.db.on("error", mongoError => {
      console.error("Database Internal Error");
      if (mongoError) console.error(`Error: ${mongoError.stack}`);
    });
    this.db.on("reconnect", mongoError => {
      this.debug("Database Reconnected");
      if (mongoError) console.error(`Error: ${mongoError.stack}`);
    });
    this.db.on("timeout", mongoError => {
      console.error("Database Timeout");
      if (mongoError) console.error(`Error: ${mongoError.stack}`);
    });

    return this.db;
  }
  build() {
    return `mongodb://${
      mongo.username}:${
      mongo.password}@${
      mongo.host}:${
      mongo.port}/${
      mongo.database}`;
  }
  // Utilities
  get guilds() {
    if (!this.collections.guilds || Date.now() - this.collections.guilds.age >= 900000) {
      this.collections.guilds = {
        col: this.db.collection(mongo.collections.guilds),
        age: Date.now()
      };
    }
    return this.collections.guilds.col;
  }

  get mutes() {
    if (!this.collections.mutes || Date.now() - this.collections.mutes.age >= 900000) {
      this.collections.mutes = {
        col: this.db.collection(mongo.collections.mutes),
        age: Date.now()
      };
    }
    return this.collections.mutes.col;
  }

  mVerifyDataIntegrity(gid, uid, data) {
    return _.merge(new DefaultMute(uid, gid), data);
  }

  verifyDataIntegrity(gid, data) {
    return _.merge(new DefaultServer(gid), data);
  }

  async createMute(gid, uid) {
    if (!this.db) throw new Error("Database Not Ready");
    const guild = this.bot.guilds.get(gid);
    if (!guild) throw new Error("Cannot Find Guild");
    const user = this.bot.users.get(uid);
    if (!user) throw new Error("Cannot find User");
    if (!this.mutes) await this.db.createCollection(mongo.collections.mutes);
    const data = new DefaultMute(uid, gid);
    await this.mutes.insertOne(data);
    return data;
  }

  async createGuild(gid, isMissing = false) {
    if (!this.db) throw new Error("Database Not Ready");
    const guild = this.bot.guilds.get(gid);
    if (!guild) throw new Error("Cannot Find Guild");
    if (!this.guilds) await this.db.createCollection(mongo.collections.guilds);
    await this.guilds.deleteMany({ gid });
    const data = new DefaultServer(gid);
    await this.guilds.insertOne(data);
    console.log(!guild ? `I"ve joined ${gid}.` : `I"ve ${(isMissing ? "added missing guild" : "joined")} ` +
    `${guild.name} (${guild.id}) owned by ${guild.owner.user.username} (${guild.owner.id}).`);
    return data;
  }

  /*
  async checkMuteList() {
  }
  */

  /*
  async deleteGuild(gid) {
    if (!this.db) throw new Error("Database Not Ready");
    const guild = this.bot.guilds.get(gid);
    if (!guild) throw new Error("Cannot Find Guild");
    if (!this.guilds) await this.db.createCollection(mongo.collections.guilds);
    await this.guilds.deleteMany({ gid });
  }
  */

  async fetchGuild(gid) {
    if (!this.db) throw new Error("Database Not Ready");
    let data = await this.guilds.findOne({ gid });
    if (!data) data = await this.createGuild(gid, true);
    delete data._id;
    data = this.verifyDataIntegrity(gid, data);
    return data;
  }

  async fetchMute(uid, gid) {
    if (!this.db) throw new Error("Database Not Ready");
    let data = await this.mutes.findOne({ uid, gid });
    if (!data) data = await this.createMute(gid, uid);
    delete data._id;
    data = this.mVerifyDataIntegrity(gid, uid, data);
    return data;
  }
}

module.exports = MongoDB;