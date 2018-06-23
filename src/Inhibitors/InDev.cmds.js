const { Inhibitor } = require("discord-akairo");

class InDevCmds extends Inhibitor {
  constructor() {
    super("indev", {
      reason: "indev"
    });
  }
  exec(m, c) {
    if (c.options.inDevelopment && m.author.id != this.client.ownerID) return true;
  }
}

module.exports = InDevCmds;