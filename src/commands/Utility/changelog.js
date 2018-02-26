const Command = require("../../structures/Command.js");
const { buildVersion } = require("../../util/Config.js");
const cLogs = require("../../util/CLogs.js");

class Changelog extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "changelog",
      desc: "Provides the user with a changelog of the current version or provided version."
    });
  }
  execute(m) {
    this.typing(true, m.channel);
    const rv = m.args[1] || buildVersion.number;
    const cLog = cLogs[rv];
    try {
      this.typing(false, m.channel);
      return m.channel.send(cLog);
    } catch (e) {
      this.typing(false, m.channel);
      return m.errors.internalError(e);
    }
  }
}

module.exports = Changelog;

