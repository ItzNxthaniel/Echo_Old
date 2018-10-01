const { Inhibitor } = require("../../Modules/Index.js");

modules.exports = class extends Inhibitor {
  constructor() {
    super("indev", {
      reason: "indev"
    });
  }
  exec(m, c) {
    if (c.options.inDevelopment && !this.client.ownerIDs.includes(m.author.id)) return true;
  }
}