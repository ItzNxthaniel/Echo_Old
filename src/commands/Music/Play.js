const { Command } = require("../../Modules/Index.js");

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "play",
      desc: "Allows you to play music!"
    });
  }

};
