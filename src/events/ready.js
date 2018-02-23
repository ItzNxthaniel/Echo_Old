const Event = require("../structures/Event.js");
const { messages } = require("../util/Config.js");

class Ready extends Event {
  constructor(client, path) {
    super(client, path, { event: "ready" });
  }
  execute() {
    this.client.debug(`Online and ready! Currently on ` +
      `${this.client.guilds.size} guild${this.client.guilds.size == 1 ? "" : "s"}.`);
    this.client.user.setPresence("online", { activity: { name: `${messages.prefix}help | ${this.client.guilds.size} servers${this.client.guilds.size == 1 ? "" : "s"}` } });
  }
}

module.exports = Ready;