const Command = require("../../structures/Command.js");
// const files = require("../../util/Restart.json");
// const fs = require("fs");

class Restart extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "restart",
      desc: "Only Runnable by Bot Owner"
    });
  }
  execute(m) {
    if (!m.isOwner) return m.errors.notBotOwner();
    this.typing(true, m.channel);
    m.errors.inDev();
    return this.typing(false, m.channel);
  }
}

module.exports = Restart;