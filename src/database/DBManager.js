/* eslint-disable */
const { MongoClient } = require("mongodb");
const { mongo } = require("../util/Tokens.js");

class DefaultServer {
  constructor(g) {
    this.g_id = g.id
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
      mutes: [],
      kicks: [],
      bans: []
    };
    this.settings = {
      notifications: false,
      preferEmbeds: false,
      noInvite: "",
      noLink: "",
      prefix: "default",
      donated: false,
      logs: {
        member: "",
        action: ""
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
  async makeNewGuild(g, isMissing = false) {
    if (!this.db) throw new Error('Database Not Ready');
    const guild = this.client.guilds.get(g);
    if (!guild) throw new Error('Client Cannot Find Guild');
    const gCollection = this.db.collection(this.client.config.mongodb.collections.guilds);
    if (!gCollection) throw new Error('Guild Database Missing');
    await gCollection.deleteMany({ g });
    const gData = new DefaultServer(g);
    await gCollection.insertOne(gData);
    this.debug(!guild ? `I've joined ${g}.` : `I've ${(isMissing ? 'added missing guild' : 'joined')} ` +
      `${guild.name} (${guild.id}) owned by ${guild.owner.user.username} (${guild.owner.id}).`);
    return gData;
  }
  
  async makeNewUser(u) {
    if (!this.db) throw new Error("Database Not Ready");
    const user = this.client.users.get(u);
    if (!user) throw new Error("Client Cannot Find User");
    const uCollection = this.db.collection(this.client.config.mongodb.collections.afk);
    if (!uCollection) throw new Error('User Database Missing');
    await uCollection.deleteMany({ u });
    const uData = new DefaultServer(u);
    await uCollection.insertOne(uData);
    return uData;
  }

  async fetchGuildData(g) {
    if (!this.db) throw new Error('Database Not Ready');
    const gCollection = await this.getCollection(this.client.config.mongodb.collections.guilds);
    if (!gCollection) throw new Error('Guild or Donations Collection Missing');
    let gData = await gCollection.findOne({ g_id: g });
    if (!this.client.config.IsBeta && !gData) gData = await this.makeNewGuild(g, true);
    if (!gData) return null;
    delete gData._id;
    return gData;
  }

  async fetchUserData(u) {
    if (!this.db) throw new Error('Database Not Ready');
    const uCollection = await this.getCollection(this.client.config.mongodb.collections.afk);
    if (!uCollection ) throw new Error('User Collection Missing');
    let uData = await uCollection.findOne({ u_id: u });
    if (!uData) return null;
    return uData;
  }

  collection(name) {
    return this.db.collection(name);
  }
}

module.exports.DBManager = DBManager;