const { Command } = require("discord-akairo");

class Donate extends Command {
  constructor() {
    super("donate", {
      aliases: ["donate", "tip"],
      description: "Gives the user the donate link!",
      typing: true
    });
  }
  exec(m) {
    return m.channel.send("It seems to me that you're interested in donating to the dev team, https://paypal.com/tearindev");
  }
}

module.exports = Donate;