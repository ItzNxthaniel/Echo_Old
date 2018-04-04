const { Inhibitor } = require("discord-akairo");

class TestersOnly extends Inhibitor {
  constructor() {
    super("testers", {
      reason: "testers",
      split: "plain",
      args: [
        {
          id: "commandID"
        }
      ]
    });
  }
  exec(m, args) {
    if (args.commandID == "subscribe") return true;
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