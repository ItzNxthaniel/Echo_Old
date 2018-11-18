const { Inhibitor } = require("../Modules/Index.js");

module.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, { enabled: true, name: "indev" });
  }
  async run(m) {
    if (!this.client.options.ownerIDs.includes(m.author.id)) {
      if (!m.command.indev) return;
      m.send(`Sorry, the \`${m.command.name}\` is currently in development.`).catch();
      throw true;
    }
  }

};
