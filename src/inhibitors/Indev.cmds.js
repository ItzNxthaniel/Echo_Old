const { Inhibitor } = require("../Modules/Index.js");

module.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, { enabled: true, name: "indev" });
  }

  async run(m) {
    if (!this.client.options.ownerIDs.includes(m.author.id)) {
      if (!m.command.indev) return;
      m.send(`<:bloboutage:396514815863947266> | Sorry, the \`${m.command.name}\` command is currently in development.`).catch();
      throw true;
    }
  }

};
