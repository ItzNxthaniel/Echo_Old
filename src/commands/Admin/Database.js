const Command = require("../../structures/Command.js");

class Database extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "database",
      desc: "The base command for getting database information.",
      aliases: ["db"],
      perm: "ADMIN"
    });
  }
  execute(m) {
    
  }
}

module.exports = Database;