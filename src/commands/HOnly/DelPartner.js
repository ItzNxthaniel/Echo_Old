/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "del-partner",
      aliases: ["dp", "delpartner", "dpartner", "delp", "rmpartner", "rpartner"],
      permissionLevel: 9,
      description: "Remove a Partnership.",
      usage: "[id:string]",
      usageDelim: " "
    });
  }

  async run(m, /* [id] */) {
    if (m.channel.id !== "451241090301820948" && m.channel.id !== "451240344953028608" && m.guild.id !== "513557686067920940") return m.channel.send("<:bloboutage:396514815863947266> | This command can only be ran in the #partner-commands channel.");
    return null;
  }

};
