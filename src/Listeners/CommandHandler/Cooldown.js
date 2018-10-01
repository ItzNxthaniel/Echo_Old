/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Listener } = require("discord-akairo");
const prettyms = require("pretty-ms")

class CommandHandlerCooldown extends Listener {
  constructor() {
    super("commandHandlerCooldown", {
      emitter: "commandHandler",
      event: "cooldown"
    });
  }

  exec(m, c, r) {
    const rT = prettyms(r);
    return m.channel.send(`You can use **${c.id}** again in \`${rT}\``);
  }
}

module.exports = CommandHandlerCooldown;
