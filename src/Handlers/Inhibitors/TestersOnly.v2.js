const { Inhibitor } = require("../../Modules/Index.js");

modules.exports = class extends Inhibitor {
  constructor() {
    super("testers", {
      reason: "testers"
    });
  };
  exec(m, c) {
    if (c.id == "subscribe") return false;

    const testers = [
      "147891648628654082", // Goom
      "295391820744228867", // Dwiggy
      "296862433136476160", // TheFloppyBanana
      "362315641161515008" // Vistril
    ]

    if (this.client.options.TestersOnly && !testers.includes(m.author.id)) return true;
  };
};