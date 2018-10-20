const { Event } = require("../Modules/Index.js");

module.exports = class ClientGuildCreate extends Event {

  constructor(...args) {
    super(...args, { name: "guildCreate" });
  }

  async run(guild) {
    this.client.mongo.createGuild(guild.id);
  }

};
