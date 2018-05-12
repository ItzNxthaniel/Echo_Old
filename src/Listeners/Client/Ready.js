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

    const cS = this.client.options.playingS[Math.floor(Math.random() * this.client.options.playingS.length)];

    this.client.user.setActivity(cS.title, {
      type: cS.type
    });
    console.log(`Online and ready! This shard is on ${this.client.guilds.size} guilds.`);
  }
}

module.exports = ClientReady;