const Event = require("../structures/Event.js");
const { messages } = require("../util/Config.js");
const fs = require("fs");
const json = fs.readFileSync("../util/Restart.json");
let restart = JSON.parse(json);

class Ready extends Event {
  constructor(client, path) {
    super(client, path, { event: "ready" });
  }
  execute() {
    if (restart != "") {
      this.client.channels.get(restart).send(`My gears are running!\n **[CONSOLE]:** Ready on ${this.client.guilds.size} guilds`);
      restart = "";
      fs.writeFileSync("../util/Restart.json", JSON.stringify(restart, null, 3));
    }
    this.client.debug(`Online and ready! Currently on ` +
    `${this.client.guilds.size} guild${this.client.guilds.size == 1 ? "" : "s"}.`);
    this.client.user.setPresence("online", { activity: { name: `${messages.prefix}help | ${this.client.guilds.size} servers${this.client.guilds.size == 1 ? "" : "s"}` } });
  }
}

module.exports = Ready;