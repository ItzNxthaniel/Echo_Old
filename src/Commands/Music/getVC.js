const { Command } = require("discord-akairo");
const { getVC } = require("./MusicManager.js");

class vcGet extends Command {
  constructor() {
    super("getvc", {
      aliases: ["getvc"],
      ownerOnly: true
    });
  }
  exec(m) {
    m.channel.send(getVC(m));
  }
}

module.exports = vcGet;