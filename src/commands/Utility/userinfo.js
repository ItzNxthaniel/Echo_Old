/* eslint-disable max-len */
const ce = require("embed-creator");
const Command = require("../../structures/Command.js");
const { colors } = require("../../util/Config.js");
const moment = require("moment-timezone");

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Information {
  constructor(member) {
    this.username = member.user.username;
    this.nickname = member.nickname || "None";
    this.id = member.id;
    this.tag = member.user.tag;
    this.bot = member.user.bot ? "Bot" : "Member";
    this.created = moment(member.user.createdAt).tz("America/Los_Angeles").format("dddd, MMMM Do, YYYY [at] h:mm A zz");
    this.joined = moment(member.joinedAt).tz("America/Los_Angeles").format("dddd, MMMM Do, YYYY [at] h:mm A zz");
    this.status = member.user.presence.status ? capFirstLetter(member.user.presence.status) : "Offline";
    this.activity = member.user.presence.activity ? capFirstLetter(member.user.presence.activity.name) : "None";
    this.avatar = member.user.avatarURL({ size: 2048 });
    this.roles = member.roles.size;
    this.highest = member.roles.highest.name.includes("@everyone") ? "Everyone" : member.roles.highest.name;
  }
}

class UserInfo extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "userinfo",
      desc: "Gives information about a selected user!",
      aliases: ["userstats"]
    });
  }
  execute(m) {
    this.typing(true, m.channel);
    if (m.isDM) {
      this.typing(false, m.channel);
      return m.errors.noDMSupport();
    }
    if (!m.ep) {
      this.typing(false, m.channel);
      return m.errors.cantEmbedLinks();
    }
    const member = m.mentions.members.first() || m.member;
    const info = new Information(member);
    const fields = [
      { inline: true, name: ":name_badge: Nickname", value: info.id.toString() },
      { inline: true, name: ":robot: Bot Account", value: info.bot.toString() },
      { inline: true, name: ":diamond_shape_with_a_dot_inside: Status", value: info.status.toString() },
      { inline: true, name: ":video_game: Game", value: info.activity.toString() },
      { inline: true, name: ":hammer: Amount of Roles", value: info.roles.toString() },
      { inline: true, name: ":top: Highest Role", value: info.highest.toString() },
      { inline: true, name: ":tools: Account Creation", value: info.created.toString() },
      { inline: true, name: ":white_check_mark: Member Joined", value: info.joined.toString() }
    ];
    this.typing(false, m.channel);
    return m.channel.send(ce(
      colors.orange, null, `${info.username}'s Stats`,
      `${info.tag} (${info.id})`,
      fields, null, { thumbnail: info.avatar }, true
    ));
  }
}

module.exports = UserInfo;