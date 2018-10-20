const { Inhibitor } = require("../Modules/Index.js");

modules.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, { name: "testers" });
  }

  async run(m, [c]) {
    if (c.name == "subscribe") return false;

    const testers = [
      "147891648628654082", // Goom
      "295391820744228867", // Dwiggy
      "296862433136476160", // TheFloppyBanana
      "362315641161515008" // Vistril
    ]

    if (this.client.options.TestersOnly && !testers.includes(m.author.id)) {
      m.send("Sorry, you're not on the EchoV2 testing list, you can't run this command. Try again later. :clock:").catch();
      throw true;
    }
  };
};