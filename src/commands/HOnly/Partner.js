/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: 'partner',
      description: "The main partner command."
    });
    this.honly = true;
  }

  async run(m) {
    if (m.guild.id !== "406966876367749131" && m.guild.id !== "513557686067920940") return m.channel.send("<:bloboutage:396514815863947266> | This is a Hub Only Command!");
    return m.channel.send("To apply for partnership, go to this website! <https://forms.tearindev.com/discord/td-partner>");
  }

};
