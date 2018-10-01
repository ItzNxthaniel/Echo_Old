const { Listener } = require("../../../Modules/Index.js");

module.exports = class extends Listener {
  constructor() {
    super("commandHandlerError", {
      emitter: "commandHandler",
      event: "error"
    });
  };

  exec(e, m) {
    return m.channel.send(`There was an internal error running this command.\`\`\`js\n${e.stack || e}\n\`\`\``);
  };
};

