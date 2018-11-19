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
    this.honly = true;
  }

  async run(m, /* [id] */) {
    return m;
  }

};
