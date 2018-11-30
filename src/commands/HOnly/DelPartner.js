/**
 * Copyright (c) 2018, TearinDev  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "del-partner",
      aliases: ["dp", "delpartner", "dpartner", "delp", "rmpartner", "rpartner"],
      permissionLevel: 9,
      description: "Remove a Partnership.",
      usage: "<id:guild>"
    });
    this.honly = true;
  }

  async run(m, [guild]) {
    if (!guild.settings.get('partner.status')) throw '<:bloboutage:396514815863947266> | The server is not partnered.';
    this.client.guilds.get(this.client.options.hubID).members.fetch(guild.settings.get('partner.ownerid'))
      .then(owner => owner.roles.remove(['420043708210085901']))
      .catch(() => { throw '<:bloboutage:396514815863947266> | The owner is not in this server.'; });

    this.client.channels.get("408786425950240781").messages.fetch(guild.settings.get('partner.msgid'))
      .then(msg => msg.delete())
      .catch(() => { throw `<:bloboutage:396514815863947266> | I could not find the message, with the provided id, \`${guild.settings.get("partner.msgid")}\``; });

    const owner = guild.settings.get("partner.ownerid");
    guild.settings.reset([
      'partner.status',
      'partner.serverid',
      'partner.msgid',
      'partner.ownerid',
      'partner.channelid',
      'partner.msginfo.title',
      'partner.msginfo.description',
      'partner.msginfo.thumbnail',
      'partner.msginfo.link'
    ]).then(res => { if (res.errors.length) throw '<:bloboutage:396514815863947266> | Something went wrong.'; });
    this.client.users.get(owner).send(`<a:ablobsadpats:447251413987229697> | Your server, \`${guild.name}\`, has been removed from TearinDev's partner program.`);
    m.send(`<:blobthumbsup:398843278235009024> | Server \`${guild.id}\` has been removed from partners.`);
    m.delete();
  }

};
