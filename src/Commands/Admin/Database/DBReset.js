/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require("discord-akairo");

class DBDebug extends Command {
  constructor() {
    super("dbreset", {
      description: "Resets the guild's settings.",
      typing: true
    });
  }
  async exec(m) {
    if (!m.member.permissions.has["ADMINISTRATOR"] && m.author.id != this.client.ownerID) return m.channel.send("You do not have valid permissions to run this command. You need the **Administrator** permission.");
    await this.client.mongo.guilds.deleteMany({ gid: m.guild.id });
    await this.client.mongo.createGuild(m.guild.id);
    return m.channel.send("Your guild's settings has been successfully reset.");
  }
}

module.exports = DBDebug;