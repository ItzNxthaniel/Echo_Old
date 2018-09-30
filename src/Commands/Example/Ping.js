/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Packages');

module.exports = class extends Command {
  constructor() {
	super('ping');
  }

  async exec(m) {
    m.channel.send("Pinging!").then(snt => {
      snt.edit("", { embed: {
	      color: 0x92ee8f, title: "Ping",
          fields: [
		    { name: "Bot Ping:", value: `${Math.floor(Math.round(bot.ping))}ms`, inline: true },
		    { name: "Message Ping", value: `${Math.floor(Math.round(snt.createdTimestamp - m.createdTimestamp))}ms`, inline: true }
		  ]
	    }});
	  });
  };
};
