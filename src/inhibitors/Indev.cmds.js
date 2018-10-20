const { Inhibitor } = require("../Modules/Index.js");

module.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, { name: "indev" });
  }
  async run(m) {
    if (this.client.options.inDevelopment && !this.client.options.ownerIDs.includes(m.author.id)) {
      m.send(`Sorry, the \`${m.command.name}\` is currently in development.`).catch();
      throw true;
    }
  }

};
