const { Command } = require("../../Modules/Index.js");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "client-set",
      aliases: ["cli-set", "c-set", "cliset", "cset"],
      desc: "The Client Set Command",
      usage: "<choice:string> [...]"
    });
  }

};
