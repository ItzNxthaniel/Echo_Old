/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {
  constructor() {
    super("version", {
      aliases: ["version", "v"],
      description: "Sends a detailed message of what version the bot is in, and what the code name is.",
      cooldown: 5000
    });
  };
  exec(m) {
    m.channel.send("FETCHING").then(snt => {
      snt.edit("", {embed:{
        color: this.client.options.randomColor, title: "The Current Version is...",
        description: `Run \`${this.client.prefix}changelog\`, to see what was added.`,
        fields: [
          {name: "Code Number", value: `\`${this.client.options.Version.Number}\``},
          {name: "Code Name", value: `\`${this.client.options.Version.Name}\``}
        ], inline: true
      }});
    });
  }
}