const Command = require("../../structures/Command.js");

class Eval extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "eval",
      desc: "Evaluates code on the bot."
    });
  }
  execute(m) {
    if (!m.isOwner) return m.errors.notBotOwner();
    this.typing(true, m.channel);
    const val = this.client.getAllArguments([m.args[0]], m.contet);
    try {
      this.typing(false, m.channel);
      return m.channel.send(`\`\`\`js\n${eval(val)}\n\`\`\``);
    } catch (e) {
      this.typing(false, m.channel);
      return m.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
  }
}

module.exports = Eval;