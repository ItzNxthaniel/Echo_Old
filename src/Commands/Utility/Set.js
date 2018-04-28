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
      ]
    });
  }
}

module.exports = Set;