const { Command } = require("../../Modules/Index.js");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "server-set",
      aliases: ["svr-set", "s-set", "svrset", "sset"],
      desc: "The Server Set Command",
      usage: "<choice:string> [...]"
    });
  }

};
