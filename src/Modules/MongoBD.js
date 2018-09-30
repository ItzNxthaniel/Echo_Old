const { MongoClient, mongo } = require('./index.js');
const EchoGuild = require('../Structures/Guild.js');
const _ = require('lodash');

class MongoDB {
  constructor(client) {
    this.bot = client;
    this.client = null;
    this.collections = {};
    this.db = null;
    this.EchoGuild = // EXTEND ECHOGUILD HERE
    this.connect();
  }
  async connect() {
    console.log("Database Connecting...");
    try {
      this.client = await MongoClient.connect(this.build(), null);
    } catch (e) {
      return console.error(e);
    };
    console.log("Database Connected.");
    this.db = this.client.db(mongo.database);
    console.log(`Database ${mongo.database} selected.`);

    this.db.on("close", mongoError => {
      console.error("Database Randomly Closed");
      if (mongoError) console.error(`MongoError: ${mongoError.stack}`);
    });
    
    this.db.on("error", mongoError => {
      console.error("Database Internal Error");
      if (mongoError) console.error(`MongoError: ${mongoError.stack}`);
    });

    this.db.on("reconnect", mongoError => {
      this.debug("Database Reconnected");
      if (mongoError) console.error(`MongoError: ${mongoError.stack}`);
    });

    this.db.on("timeout", mongoError => {
      console.error("Database Timeout");
      if (mongoError) console.error(`MongoError: ${mongoError.stack}`);
    });

    return this.db;
  };
  build() {
    return `mongodb://${
      mongo.username}:${
      mongo.password}@${
      mongo.host}:${
      mongo.port}/${
      mongo.database}`;
  };
  // Utilites
};

modules.exports = MongoDB;