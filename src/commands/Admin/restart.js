const Command = require("../../structures/Command.js");
const file = require("../../util/Restart.js");

class Restart extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "Restart",
      desc: "Only Runnable by Bot Owner"
    });
  }
  async execute(m) {
    this.typing(true, m.channel);

  }
}

module.exports = Restart;