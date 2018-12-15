const { Command } = require("../../Modules/Index.js");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "user-set",
      aliases: ["usr-set", "u-set", "usrset", "uset"],
      desc: "The User Set Command",
      usage: "<choice:string> [...]"
    });
  }

};
