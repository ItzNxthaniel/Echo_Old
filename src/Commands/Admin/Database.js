/* eslint-disable max-len */
const { Command } = require("discord-akairo");

class Database extends Command {
  constructor() {
    super("database", {
      aliases: ["database", "db"],
      description: "The base command for getting database information.",
      args: [
        {
          id: "infoType",
          type: "lowercase"
        },
        {
          id: "content",
          match: "rest"
        }
      ]
    });
  }
  exec(m, args) {
    if (!args.infoType) {
      return m.channel.send("Invalid Option, please choose `debug`, `reset`, or `help`." +
       `Example: \`${this.handler.prefix}${this.id} reset\``);
    } else if (args.infoType == "debug") {
      return this.handler._handleCommand(m, args.content, this.handler.modules.get("dbdebug"));
    } else if (args.infoType == "reset") {
      return this.handler._handleCommand(m, args.content, this.handler.modules.get("dbreset"));
    } else if (args.infoType == "help") {
      return m.channel.send(`Here's the message you requested for:\n\n\`${this.handler.prefix}${this.id} reset\`\n Allows you to reset the whole database, owner only!\n\n\`${this.handler.prefix}${this.id} debug\`\n Shows you your whole server database in one message, admins only!`);
    }
  }
}

module.exports = Database;