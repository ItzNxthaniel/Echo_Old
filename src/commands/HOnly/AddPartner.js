/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: 'add-partner',
      aliases: ["ap", "addpartner", "apartner", "addp"],
      permissionLevel: 9,
      description: "Add a Partnership.",
      usage: '[name:string] [desc:string] [svr:string] [owner:user] [icon:string] [inv:string] [chn:string]',
      usageDelim: ' ',
      quotedStringSupport: true
    });
    this.honly = true;
  }

  async run(m, [name, desc, svr, owner, icon, inv, chn = "408786425950240781"]) {
    if (!name || !desc || !svr || !owner || !icon) {
      return m.channel.send("<:bloboutage:396514815863947266> | It seems like you're missing an argument! | The command should look like `<Server_Name> <Server_Description> <Server_ID> <Server_Owner_ID> <Server_Icon> [Server_Invite]` | ***Auto Delete in 5 Seconds!***").then(snt => {
        setTimeout(() => {
          m.delete();
          snt.delete();
        }, 5000);
      });
    }
    if (inv === "N/A") inv = "EMPTY";
    if (!m.guild.members.get(owner.id)) {
      return m.channel.send("<:bloboutage:396514815863947266> | The supplied `OWNER_ID` was not matched with anybody in the server. | ***Auto Delete in 5 Seconds!***").then(snt => {
        setTimeout(() => {
          m.delete();
          snt.delete();
        }, 5000);
      });
    }
    if (!this.client.guilds.get(svr)) {
      return m.channel.send("<:bloboutage:396514815863947266> | The supplied `SERVER_ID` was not matched with any of Echo's servers. | ***Auto Delete in 5 Seconds!***").then(snt => {
        setTimeout(() => {
          m.delete();
          snt.delete();
        }, 5000);
      });
    }

    this.client.channels.get(chn).send("<@&431210967595089926>", { embed: {
      color: this.client.options.Colors.randomColor, title: name + " :: " + owner.tag, description: desc,
      author: { name: inv === "EMPTY" ? "No Invite Provided" : "Click Here To Join", url: inv === "EMPTY" ? "" : inv },
      thumbnail: { url: icon }
    } }).then(snt => {
      this.client.guilds.get(svr).settings.update([["partner.status", true], ["partner.serverid", svr], ["partner.msgid", snt.id], ["partner.ownerid", owner.id], ["partner.channelid", snt.channel.id], ["partner.thumbnail", icon], ["partner.link", inv === "EMPTY" ? "EMPTY" : inv], ["partner.msginfo.title", name], ["partner.msginfo.description", desc]]);
    });

    owner.send(`<a:apartyblob:469006617573064704> | Congrats! | Your server, \`${name}\`, was accepted to TearinDev's partnership program!`);
    this.client.guilds.get("406966876367749131").members.get(owner.id).roles.add(["420043708210085901"]);
    return m.channel.send("<:blobthumbsup:398843278235009024> | I've successfully add them to the partner list. | ***Auto Delete in 5 Seconds!***").then(snt => {
      if (m.guild.id === "406966876367749131") {
        setTimeout(() => {
          m.delete();
          snt.delete();
        }, 5000);
      }
    });
  }

};


/*
  `[Channel_ID] <Server_Name> <Server_Description> <Server_ID> <Server_Owner_ID> <Server_Icon> [Server_Invite]`
  `<Server_ID>`
  `<Server_ID> <Item> <New_Info>`
  */
