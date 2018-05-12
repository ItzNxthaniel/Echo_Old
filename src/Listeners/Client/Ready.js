const { Listener } = require("discord-akairo");

class ClientReady extends Listener {
  constructor() {
    super("clientReady", {
      emitter: "client",
      event: "ready"
    });
  }

  exec() {
    /*
    this.client.user.setActivity(`${this.client.akairoOptions.prefix}help`, {
      url: "https://www.twitch.tv/monstercat/",
      type: "STREAMING"
    });
    */

    this.client.user.setActivity("on " + this.client.guilds.size + " " + this.client.guilds.size == 1 ? "server!" : "servers!");
    console.log(`Online and ready! This shard is on ${this.client.guilds.size} guilds.`);
  }
}

module.exports = ClientReady;