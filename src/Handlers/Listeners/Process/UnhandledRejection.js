const { Listener } = require("../../../Modules/Index.js");

module.exports = class extends Listener {
  constructor() {
    super("processUnhandledRejection", {
      emitter: "process",
      event: "unhandledRejection"
    });
  };

  exec(e) {
    return console.error(e);
  };
};
