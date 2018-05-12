const { Command } = require("discord-akairo");
const { play } = require("./musicManager.js");

class Play extends Command {
  constructor() {
    super("play", {
      aliases: ["play"]
    });
  }
  exec(m) {
    play(m);
  }
}

module.exports = Play;