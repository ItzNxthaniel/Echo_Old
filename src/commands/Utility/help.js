const Command = require("../../structures/Command.js");

class Help extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "help",
      description: "Returns the list of the commands",
      aliases: ["cmds", "commands", "clist", "?"]
    });
  }
  async execute(m) {
    this.typing(true, m.channel);
    const s = m.argsLower[1];
    if (!s) {
      const msg2Snd = await this.client.getRandom(this.client.config.lang.helpMsgs);
      this.typing(false, m.channel);
      m.channel.send(await this.translate(m.guildData.settings.lang, msg2Snd));
      const msg = "We thank you for choosing Echo, as your multi-use bot! Here's a list of commands that you requested.\n\n" +
        "// **Utility Commands**\n" +
        ">> e$changelog\n" +
        ">> e$help\n" +
        ">> e$ping\n" +
        ">> e$set\n" +
        ">> e$userinfo\n" +
        "// **Hub Only Commands**\n" +
        ">> e$sub\n" +
        "// **Admin Commands**\n" +
        ">> e$eval\n" +
        ">> e$restart\n\n" +
        "If you have any questions or need some help, feel free to join Echo's Home Server: https://discord.gg/hrmnCC8";
      return m.author.send(msg);
    }
    this.typing(false, m.channel);
    return m.errors.inDev();
  }
}

module.exports = Help;