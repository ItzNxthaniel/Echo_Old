/* eslint-disable */
const { MongoClient } = require("mongodb");
const { mongo } = require("../util/Tokens.js");

class DefaultServer {
  constructor(gid) {
    this.g_id = gid
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
        words: []
      },
      dmr: {
        mute: false,
        warn: false,
        kick: false,
        ban: false,
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
        member: "",
        action: "",
        warn: ""
      },
      auto_join_role: {
        user: {
          enabled: false,
          role_id: ""
        },
        bot: {
          enabled: false,
          role_id: ""
        }
      },
      user_leave_notify: false
    };
  }
}

class DefaultUser {
  constructor(u) {
    this.u_id = u.id;
    this.afkReason = "";
  }
}

class DBManager {
  constructor(client) {
    this.client = client;
    this.url = `mongodb://${
      mongo.username}:${
      mongo.password}@${
      mongo.host}:${
      mongo.port}/${
      mongo.database}`;
    this.mcient = null,
      this.db = null
  }

  // Debug
  debug(...args) {
    return this.client.debug(`[DB]`, ...args);
  }

  error(...args) {
    return this.client.error('[DB]', ...args);
  }

  // Connect
  async connect() {
    this.debug('Creating Database...');
    try {
      this.mcient = await MongoClient.connect(this.url, null);
    } catch (e) {
      return this.error(e);
    }
    this.db = this.mcient.db(mongo.database);
    this.db.on("close", mongoError => {
      this.error("Database Randomly Closed");
      if (mongoError) this.error(`Error: ${mongoError.stack}`);
    });
    this.db.on('error', mongoError => {
      this.error('Database Internal Error');
      if (mongoError) this.error(`Error: ${mongoError.stack}`);
    });
    this.db.on('reconnect', mongoError => {
      this.debug('Database Reconnected');
      if (mongoError) this.error(`Error: ${mongoError.stack}`);
    });
    this.db.on('timeout', mongoError => {
      this.error('Database Timeout');
      if (mongoError) this.error(`Error: ${mongoError.stack}`);
    });
    this.debug('Database Created.');
    return this.db;
  }

  // Utilities
  async makeNewGuild(gid, isMissing = false) {
    if (!this.db) throw new Error('Database Not Ready');
    const guild = this.client.guilds.get(gid);
    if (!guild) throw new Error('Client Cannot Find Guild');
    const gCollection = this.db.collection(this.client.config.mdb.guilds);
    if (!gCollection) throw new Error('Guild Database Missing');
    await gCollection.deleteMany({
      gid
    });
    const gData = new DefaultServer(gid);
    await gCollection.insertOne(gData);
    this.debug(!guild ? `I've joined ${gid}.` : `I've ${(isMissing ? 'added missing guild' : 'joined')} ` + `${guild.name} (${guild.id}) owned by ${guild.owner.user.username} (${guild.owner.id}).`);
    return gData;
  }
  /*

  async makeNewUser(u) {
    if (!this.db) throw new Error("Database Not Ready");
    const user = this.client.users.get(u);
    if (!user) throw new Error("Client Cannot Find User");
    const uCollection = this.db.collection(this.client.config.mdb.afk);
    if (!uCollection) throw new Error('User Database Missing');
    await uCollection.deleteMany({ u });
    const uData = new DefaultServer(u);
    await uCollection.insertOne(uData);
    return uData;
  }
  */

  async fetchGuildData(gid) {
    if (!this.db) throw new Error('Database Not Ready');
    const gCollection = await this.collection(this.client.config.mdb.guilds);
    const dCollection = await this.collection(this.client.config.mdb.donations);
    if (!gCollection || !dCollection) throw new Error('Guild or Donations Collection Missing');
    let gData = await gCollection.findOne({
      g_id: gid
    });
    if (!gData) gData = await this.makeNewGuild(gid, true);
    if (!gData) return null;
    delete gData._id;
    const da = await dCollection.findOne({
      guild_id: gid
    });
    if (!da) {
      gData.donationAmount = 0;
    } else {
      delete da._id;
      gData.donationAmount = da.amount;
    }
    return gData;
  }

  /*
  async fetchUserData(u) {
    if (!this.db) throw new Error('Database Not Ready');
    const uCollection = await this.collection(this.client.config.mdb.afk);
    if (!uCollection ) throw new Error('User Collection Missing');
    let uData = await uCollection.findOne({ u_id: u });
    if (!uData) return null;
    return uData;
  }
  */

  collection(name) {
    return this.db.collection(name);
  }
}

module.exports.DBManager = DBManager;