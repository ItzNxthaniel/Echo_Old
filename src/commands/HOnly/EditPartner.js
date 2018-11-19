/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "edit-partner",
      aliases: ["ep, editpartner, editp, epartner"],
      permissionLevel: 9,
      description: "Edit a Partnership.",
      usage: "[id:string] [item:string] [new:string]",
      usageDelim: " ",
      quotedStringSupport: true
    });
    this.honly = true;
  }

  async run(m, /* [id, item, updated] */) {
    return m;
  }

};
