const { Event } = require("../Modules/Index.js");

module.exports = class extends Event {

  constructor(...args) {
    super(...args, { name: "unhandledrejection" });
  };

  async run(e) {
    return console.error(e);
  };

};
