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
      usageDelim: ' || ',
      subcommands: true
    })
  };

  async add(m, [name, desc, id, oid, icon, inv]) {

  }

  async remove(m, [id]) {

  }

  async update(m, [id, old, updated]) {

  }
}
