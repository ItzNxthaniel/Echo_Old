const { Command } = require("discord-akairo");

class Set extends Command {
  constructor() {
    super("set", {
      aliases: ["set", "setting"],
      split: "plain",
      args: [
        {
          id: "cSet",
          type: "lowercase"
        }
      ],
      options: {
        inDevelopment: true
      }
    });
  }
  exec(m, args) {
    return m.channel.send("Soon:tm:");
  }
}

module.exports = Set;