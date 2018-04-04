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
  exec(m, args) {
    if (!args.commandID) {
      m.channel.send(this.client.options.helpMsgs[Math.floor(Math.random() * this.client.options.helpMsgs.length)]);
      const msg = "We thank you for choosing Echo, as your multi-use bot! Here's a list of commands that you requested.\n\n" +
        "// **Utility Commands**\n" +
        ">> e$donate\n" +
        ">> e$help\n" +
        ">> e$ping\n" +
        "// **Hub Only Commands**\n" +
        ">> NULL\n" +
        "// **Admin Commands**\n" +
        ">> e$eval\n" +
        ">> e$restart\n" +
        ">> e$load\n" +
        ">> e$reload\n" +
        ">> e$unload\n\n" +
        "If you have any questions or need some help, feel free to join Echo's Home Server: https://discord.gg/hrmnCC8";
      m.author.send(msg);
    }
  }
}

module.exports = Help;