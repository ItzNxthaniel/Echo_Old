const Command = require("../../structures/Command.js");

class CMD extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "_name",
      description: "_desc"
    });
  }
  execute(m) {
    
  }
}

module.exports = CMD;