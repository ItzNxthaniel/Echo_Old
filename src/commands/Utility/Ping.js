/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ["ping"],
      description: "Gets the current speed of the WebSocket and Message Ping",
      cooldown: 5
    });
  }

  async run(m) {
    const snt = await m.send("Pinging!");
    return snt.edit({
      embed: {
        color: 0x92ee8f,
        title: "Ping",
        fields: [
          { name: "Bot Ping:", value: `${await Math.floor(Math.round(this.client.ws.ping))}ms`, inline: true },
          { name: "Message Ping:", value: `${await Math.floor(Math.round(snt.createdTimestamp - m.createdTimestamp))}ms`, inline: true }
        ]
      }
    });
  }

};
