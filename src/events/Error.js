const { Event } = require("../Modules/Index.js");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, { name: "wtf" });
  };

  async run(m, [e]) {
    return m.channel.send(`There was an internal error running this command.\`\`\`js\n${e.stack || e}\n\`\`\``);
  };
};

