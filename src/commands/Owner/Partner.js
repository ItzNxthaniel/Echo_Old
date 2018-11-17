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
      permissionLevel: 9,
      description: "The main partner command.",
      usage: '<add|remove|update> <Argument:string> [...]',
      usageDelim: ' ',
      quotedStringSupport: true,
      subcommands: true
    });
  }

  async add(m, [/* name, desc, */id, oid/* icon, inv*/]) {
    if (m.channel.id !== "451241090301820948" && m.channel.id !== "451240344953028608") return m.channel.send("This command can only be ran in the #partner-commands channel.");
    if (!m.guild.members.get(oid)) return m.channel.send("That user is not in this server!");
    if (!this.client.guilds.get(id)) return m.channel.send("That server has not added Echo!");
    return null;
  }

  async remove(m, /* [id] */) {
    if (m.channel.id !== "451241090301820948") return m.channel.send("This command can only be ran in the #partner-commands channel.");
    return null;
  }

  async update(m, /* [id, old, updated]*/) {
    if (m.channel.id !== "451241090301820948") return m.channel.send("This command can only be ran in the #partner-commands channel.");
    return null;
  }

};
