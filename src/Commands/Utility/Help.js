const { Command } = require("discord-akairo");

class Help extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "cmds", "clist", "?"],
      description: "Returns the list of the commands",
      typing: true,
      args: [
        {
          id: "commandID"
        }

      ]
    });
  }
  async exec(m, args) {
    if (!args.commandID) {
      const msg2Snd = await this.client.akairoOptions.helpMsgs[Math.floor(Math.random() * this.client.akairoOptions.helpMsgs.length)];
      m.channel.send(msg2Snd);
    }
  }
}

module.exports = Help;