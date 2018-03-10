/* eslint-disable max-len */
const Command = require("../../structures/Command.js");
const { langCodes } = require("../../util/Config.js").lang;

class Set extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "set",
      desc: "Allows you to customize settings on your server!"
    });
  }
  async execute(m) {
    this.typing(true, m.channel);
    const f = m.argsLower[1];
    const guilds = this.client.dbm.collection(this.client.config.mdb.guilds);
    if (!f) {
      this.typing(false, m.channel);
      const fp = await this.translate(m.guildData.settings.lang, "Current changeable settings");
      return m.reply(`${fp},\n \`prefix <prefix wanted/off>\`\n\`lang <language>\``);
    }
    if (["prefix", "p"].includes(f)) {
      if (!m.isGuildOwner && !m.isOwner) {
        this.typing(false, m.channel);
        return m.errors.notGuildOwner();
      }
      let s = m.argsLower[2];
      if (!s) {
        this.typing(false, m.channel);
        return m.reply(await this.translate(m.guildData.settings.lang, "You need to supply a prefix!"));
      }
      if (m.guildData.settings.prefix == s && s != "off") {
        this.typing(false, m.channel);
        return m.reply(await this.translate(m.guildData.settings.lang, "You already have the prefix set to this!"));
      }
      if (s != "off") {
        if (s == "e$") s = "default";

        m.guildData.settings.prefix = s;
        guilds.update({ g_id: m.guild.id }, m.guildData);
        this.typing(false, m.channel);
        const fp = await this.translate(m.guildData.settings.lang, "Alright, I've set this server's prefix to");
        const sp = await this.translate(m.guildData.settings.lang, "if there were captialized characters I went ahead and lowered them!");
        m.channel.send(`${fp} \`${s}\` ${sp}`);
      } else {
        if (m.guildData.settings.prefix == "default") {
          this.typing(false, m.channel);
          return m.reply(await this.translate(m.guildData.settings.lang, "You already have the prefix set to this!"));
        }
        m.guildData.settings.prefix = "default";
        guilds.update({ g_id: m.guild.id }, m.guildData);
        this.typing(false, m.channel);
        const fp = await this.translate(m.guildData.settings.lang, "Alright, I've set this server's prefix to");
        const sp = await this.translate(m.guildData.settings.lang, "if there were captialized characters I went ahead and lowered them!");
        m.channel.send(`${fp} \`e$\` ${sp}`);
      }
    } else if (["lang", "l"].includes(f)) {
      if (!m.isGuildOwner && !m.isOwner) {
        this.typing(false, m.channel);
        return m.errors.notGuildOwner();
      }
      const s = m.argsLower[2];
      if (!s) {
        this.typing(false, m.channel);
        return m.reply(await this.translate(m.guildData.settings.lang, "You need to supply a language"));
      }

      if (!langCodes[s]) {
        this.typing(false, m.channel);
        return m.reply(this.translate(m.guildData.settings.lang, "Sorry, but currently the language you entered is not supported!"));
      }

      m.guildData.settings.lang = s;
      guilds.update({ g_id: m.guild.id }, m.guildData);
      this.typing(false, m.channel);
      const fp = await this.translate(m.guildData.settings.lang, "Alright, I've set this server's default language to");
      const sp = await this.translate(m.guildData.settings.lang, "please notice we use Google Translate API V3 to make this possible! We all know Google Translate isn't the best.");
      m.channel.send(`${fp} \`${s}\` ${sp}`);
    }
  }
}

module.exports = Set;