const { Event } = require("../Modules/Index.js");

module.exports = class extends Event {

  constructor(...args) {
    super(...args, { name: "klasaReady" });
  }

  async run() {
    this.client.user.setActivity(`on ${this.client.guilds.size} ${this.client.guilds.size === 1 ? "server!" : "servers!"}`);
    console.log(`Online and ready! This shard is on ${this.client.guilds.size} guilds.`);

    setInterval(() => {
      const cS = this.options.playingS[Math.floor(Math.random() * this.options.playingS.length)];

      this.client.user.setActivity(cS.title, {
        type: cS.type
      });
    }, 60000);
  }

};
