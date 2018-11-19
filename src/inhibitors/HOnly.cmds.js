const { Inhibitor } = require("../Modules/Index.js");

module.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, { enabled: true, name: "honly" });
  }

  async run(m) {
    if (m.guild.id !== "406966876367749131" && m.guild.id !== "513557686067920940") {
      if (!m.command.honly) return;
      m.send(`<:bloboutage:396514815863947266> | Sorry, this command can only be ran in \`${this.client.guilds.get("406966876367749131").name}\` and \`${this.client.guilds.get("513557686067920940").name}\`.`);
      throw true;
    }
  }

};
