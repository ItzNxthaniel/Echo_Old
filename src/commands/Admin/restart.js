const Command = require("../../structures/Command.js");
const fs = require("fs");

class Restart extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "restart",
      desc: "Only Runnable by Bot Owner",
      aliases: ["reboot"]
    });
  }
  execute(m) {
    if (!m.isOwner) return m.errors.notBotOwner();
    this.typing(true, m.channel);
    const json = fs.readFileSync("././util/Restart.json");
    let restart = JSON.parse(json);
    restart = m.channel.id;
    fs.writeFileSync("././util/Restart.json", JSON.stringify(restart, null, 3));
    m.channel.send(":warning: Restarting my system!").then(() => {
      this.typing(false, m.channel);
      process.exit();
    });
  }
}

module.exports = Restart;