/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require("discord-akairo");
const parsems = require("parse-duration");

class Mute extends Command {
  constructor() {
    super("mute", {
      aliases: ["mute"],
      split: "plain",
      args: [
        { id: "userTag", type: "memberMention" },
        { id: "time", type: "string" },
        { id: "reason", type: "rest" }
      ]
    });
  }
  async exec(m, args) {
    const gData = await this.client.mongo.fetchGuild(m.guild.id);
    if (!args) return m.channel.send(`The command needs to look like this,\n\`${this.handler.prefix}${this.id}mute @user yy:mm:ww:dd:hh:mm:ss reason\``);
    if (!args.userTag) return m.channel.send("You need to tag a user!");
    if (!args.time) return m.channel.send("You must include the amount of time to mute this user! Example: 29d5h20m98s");
    const member = m.mentions.members.first();
    const reason = !args.reason ? "NO_REASON_PROVIDED" : args.reason;
    const mRole = gData.moderation.mutes.mRoleID;
    if (!mRole) return m.channel.send(`There is no mute role set! Please run, \`${this.handler.prefix}set\` to get started`);
    if (m.member.roles.highest.position <= member.roles.highest.position) return m.channel.send(`You can't manage this user's roles!`);

    // Time Handler
    let time;
    if (args.time != "perm") {
      time = parsems(args.time);
      if (!time) return m.channel.send("You used an invalid format! Example: 29d5h20m98s");
      if ((time / 1000) / 60 < 1) return m.channel.send("I can't do anything below a minute! I only check every minute.");
      if ((time / 5184000000) > 1) return m.channel.send(`I won't do anything above 60 days! If you want to mute them for that long, you'll have to use \`mute perm\`, and remove it manually from them using \`unmute\`.`);
      time = parseInt(time.toString().match(/^-?\d+(?:\d{0,0})?/)[0]);
    } else {
      time = "perm";
    }

    if (gData.settings.logs.action != "") {
      const logID = gData.settings.logs.action;
      if (gData.settings.preferEmbeds) {
        this.client.channels.get(logID).send({ embed: {
          color: this.client.options.colors.red, title: `❌ ${member.user.tag} has been muted!`, description: `Time: **${time == "perm" ? "∞" : time}** Reason: __${reason}__`
        } });
      } else {
        this.client.channels.get(logID).send(`${member.user.tag} has been muted for **${args.time == "perm" ? "∞" : args.time}**, reason given: *${reason}*`);
      }
    }

    if (gData.moderation.mutes.dmr) {
      member.send(`You've been muted for \`${args.time}\`, on \`${m.guild.name}\`, because \`${reason}\``);
    }

    member.roles.add([mRole]);
    m.channel.send(`I have muted the user, *${member.user.tag}*, for *${args.time}*.`);
    this.client.mongo.createMute(m.guild.id, member.user.id);
    const mData = this.client.mongo.fetchMute(member.user.id, m.guild.id);
    mData.muteInfo.time = time;
    mData.muteInfo.reason = reason;
    const cMutes = this.client.mongo.mutes;
    cMutes.update({ uid: member.user.id, gid: m.guild.id }, mData);
  }
}

module.exports = Mute;