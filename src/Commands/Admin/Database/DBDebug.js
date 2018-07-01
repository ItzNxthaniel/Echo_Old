/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require("discord-akairo");

class DBDebug extends Command {
  constructor() {
    super("dbdebug", {
      description: "Sends debug information about the current guild data."
    });
  }
  async exec(m) {
    if (!m.member.permissions.has["ADMINISTRATOR"] && m.author.id != this.client.ownerID) return m.channel.send("You do not have valid permissions to run this command. You need the **Administrator** permission.");
    const settings = await this.client.mongo.fetchGuild(m.guild.id);
    if (!settings) return m.channel.send("I was unable to find the data for this guild.");
    let string = JSON.stringify(settings, null, 2);
    string = string.split("\n");
    const arr = [];
    let newstring = "";
    let pos = 0;
    for (let i = 0; i < string.length; i++) {
      newstring += i != string.length - 1 ? string[i] + "\n" : string[i];
      pos += string[i].length;
      if (pos >= 1900) {
        pos = 0;
        arr.push(newstring);
        newstring = "";
      } else if (i == string.length - 1) {
        arr.push(newstring);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      await m.channel.send(`\`\`\`json\n${arr[i]}\n\`\`\``);
    }
  }
}

module.exports = DBDebug;