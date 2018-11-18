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
      usage: '[cid:string] [name:string] [desc:string] [id:string] [oid:string] [icon:string] [inv:string]',
      usageDelim: ' ',
      quotedStringSupport: true
    });
  }

  async run(m, [cid = "408786425950240781", name, desc, id, oid, icon/* , inv*/]) {
    if (m.channel.id !== "451241090301820948" && m.channel.id !== "451240344953028608" && m.guild.id !== "513557686067920940") return m.channel.send("<:bloboutage:396514815863947266> | This command can only be ran in the #partner-commands channel.");
    if (!name || !desc || !id || !oid || !icon) return m.channel.send("<:bloboutage:396514815863947266> | It seems like you're missing an argument!");
    if (!m.guild.members.get(oid)) return m.channel.send("<:bloboutage:396514815863947266> | The supplied `OWNER_ID` was not matched with anybody in the server.");
    if (!this.client.guilds.get(id)) return m.channel.send("<:bloboutage:396514815863947266> | The supplied `SERVER_ID` was not matched with any of Echo's servers.");
    return this.client.guilds.get(cid).send("This is a partner test!");
  }

};

/*
  `[Channel_ID] <Server_Name> <Server_Description> <Server_ID> <Server_Owner_ID> <Server_Icon> [Server_Invite]`
  `<Server_ID>`
  `<Server_ID> <Item> <New_Info>`
  */
