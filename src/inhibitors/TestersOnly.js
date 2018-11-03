const { Inhibitor } = require("../Modules/Index.js");

module.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, { enabled: true, name: "testers" });
  }

  async run(m, c) {
    if (c.name === "subscribe" || c.name === "ping") return;

    if (this.client.options.TestersOnly && !this.client.options.Testers.includes(m.author.id)) {
      m.send("Sorry, you're not on the EchoV2 testing list, you can't run this command. Try again later. :clock:").catch();
      throw true;
    }
  }

};
