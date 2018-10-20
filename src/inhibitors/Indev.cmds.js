const { Inhibitor } = require("../Modules/Index.js");

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, { name: "indev" });
  }
  async run(m) {
    if (this.client.options.inDevelopment && !this.client.options.ownerIDs.includes(m.author.id)) {
      msg.send(`Sorry, the \`${c.name}\` is currently in development.`).catch();
      throw true;
    }
  }
}