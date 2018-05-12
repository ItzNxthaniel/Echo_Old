const { Command } = require("discord-akairo");
const { stop } = require("./musicManager.js");

class Stop extends Command {
  constructor() {
    super("stop", {
      aliases: ["stop", "leave"]
    });
  }
  exec(m) {
    stop(m);
  }
}

module.exports = Stop;