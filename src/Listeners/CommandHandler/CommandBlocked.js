const { Listener } = require("discord-akairo");

class CommandHandlerCommandBlocked extends Listener {
  constructor() {
    super("commandHandlerCommandBlocked", {
      emitter: "commandHandler",
      event: "commandBlocked"
    });
  }
  exec(m, c, r) {
    if (r == "testers") {
      return m.channel.send("Sorry, you're not on the EchoV2 testing list, you can't run this command. Try again later. :clock:").catch(() => {
        // ...
      });
    }
  }
}

module.exports = CommandHandlerCommandBlocked;