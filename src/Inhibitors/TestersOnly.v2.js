const { Inhibitor } = require("discord-akairo");

class TestersOnly extends Inhibitor {
  constructor() {
    super("testers", {
      reason: "testers"
    });
  }
  exec(m, c) {
    if (c.id == "subscribe") return false;
    /* eslint-disable */
    const testers = [
      "112732946774962176", // FireController1847
      "147891648628654082" // GoomigJS
    ];
    /* eslint-enable */
    return !testers.includes(m.author.id);
  }
}

module.exports = TestersOnly;