const { MongoClient } = require("mongodb");
const { mongo } = require("./Data/Tokens.js");
const _ = require("lodash");

class DefaultServer {
  constructor(gid) {
    this.g_id = gid;
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
        actOnSwear: {
          enabled: false,
          message: ""
        },
        delOMsg: false
      },
      mutes: {
        dmr: false,
        actOnSwear: {
          enabled: false,
          message: ""
        },
        delOMsg: false
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
  verifyDataIntegrity(gid, data) {
    return _.merge(new DefaultServer(gid), data);
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
  async fetchGuild(gid) {
    if (!this.db) throw new Error("Database Not Ready");
    let data = await this.guilds.findOne({ gid });
    if (!data) data = await this.createGuild(gid, true);
    delete data._id;
    data = this.verifyDataIntegrity(gid, data);
    return data;
  }
}

module.exports = MongoDB;