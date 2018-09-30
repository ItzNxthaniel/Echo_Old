/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {
  constructor() {
	  super("ping", {
      aliases: ["ping"],
      description: "Gets the current speed of the WebSocket and Message Ping"
    });
  }

  async exec(m) {
    m.channel.send("Pinging!").then(snt => {
      snt.edit("", { embed: {
		  color: 0x92ee8f, title: "Ping",
          fields: [
		    { name: "Bot Ping:", value: `${await Math.floor(Math.round(bot.ping))}ms`, inline: true },
		    { name: "Message Ping", value: `${await Math.floor(Math.round(snt.createdTimestamp - m.createdTimestamp))}ms`, inline: true }
		  ]
	    }});
	  });
  };
};

// want to make it use await? ~banan