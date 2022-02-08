const { Command } = require("../../Modules/Index.js");

function getRole(type, v, g) {
  if (type === "id") {
    return g.roles.get(v);
  } else if (type === "name") {
    return g.roles.find(r => r.name.toLowerCase() === v.toLowerCase());
  } else { return null; }
}

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "server-set",
      aliases: ["svr-set", "s-set", "svrset", "sset"],
      desc: "The Server Set Command",
      usage: "<choice:string> <setting:string> [...]",
      usageDelim: " ",
      quotedStringSupport: true
    });

    this.customizeResponse('choice', (m) => "`*` ***GLOBAL SETTINGS:***\n \n`<{choice} {setting}>`\n \n`*` ***PRIVATE SETTINGS:***\n \n`<{choice} {option}>`\n \n`*` ***HAVING TROUBLE?***\n  \nTry running, `" + m.guild.settings.prefix + m.content.split(' ')[0].slice(m.prefixLength) + " help <CHOICE>`\n*or* join the support server. Run, `" + m.guild.settings.prefix + "links`");
    this.customizeResponse('setting', (m) => "`*` ***GLOBAL SETTINGS:***\n \n`<{choice} {setting}>`\n \n`*` ***PRIVATE SETTINGS:***\n \n`<{choice} {option}>`\n \n`*` ***HAVING TROUBLE?***\n  \nTry running, `" + m.guild.settings.prefix + m.content.split(' ')[0].slice(m.prefixLength) + " help <CHOICE>`\n*or* join the support server. Run, `" + m.guild.settings.prefix + "links`");
  }

  run(m, [choice, setting]) {
    choice = choice.toUpperCase();

    // search_PREFIX
    if (choice === "PREFIX") {
      if (!m.member.hasPermission("ADMINISTRATOR") && !this.client.options.ownerIDs.includes(m.author.id)) return m.channel.send("<:bloboutage:396514815863947266> | Sorry, you can not use this command, only members with `ADMINISTRATOR` can.");
      setting = setting.toUpperCase();
      if (setting === "RESET") {
        try {
          m.guild.settings.reset('prefix');
          return m.channel.send(`<:blobthumbsup:398843278235009024> | \`${m.guild.name}\`'s prefix has been successfully reset!`);
        } catch (e) { return m.channel.send(m.language.get("COMMAND_ERROR", e)); }
      } else {
        try {
          m.guild.settings.update('prefix', setting);
          return m.channel.send(`<:blobthumbsup:398843278235009024> | \`${m.guild.name}\`'s prefix has been successfully set to \`${setting}\`. Try it out now by running \`${setting}ping\``);
        } catch (e) { return m.channel.send(m.language.get("COMMAND_ERROR", e)); }
      }
    }

    // search_USER-JOIN-ROLE
    if (choice === "USER_JOIN_ROLE") {
      if (!m.member.hasPermission("ADMINISTRATOR") && !this.client.options.ownerIDs.includes(m.author.id)) return m.channel.send("<:bloboutage:396514815863947266> | Sorry, you can not use this command, only members with `ADMINISTRATOR` can.");
      setting = setting.toUpperCase();
      if (["OFF", "RESET"].includes(setting)) {
        if (m.guild.settings.automod.auto_role.user === "") return m.channel.send(`<:bloboutage:396514815863947266> | \`${m.guild.name}\`'s auto join role for users, is already off.`);
        try {
          m.guild.settings.reset('automod.auto_role.user');
          return m.channel.send(`<:blobthumbsup:398843278235009024> | \`${m.guild.name}\`'s auto join role for users has been successfully reset and turned off!`);
        } catch (e) { return m.channel.send(m.language.get("COMMAND_ERROR", e)); }
      } else {
        try {
          const role = m.mentions.roles.size > 0 ? getRole("id", m.mentions.roles.first().id, m.guild) : getRole("name", setting, m.guild);
          if (!role) return m.channel.send("<:bloboutage:396514815863947266> | You did not supply a valid role.");
          if (role.id === m.guild.settings.automod.auto_role.user) return m.channel.send(`<:bloboutage:396514815863947266> | \`${m.guild.name}\`'s auto join role for users, is already set to \`${role.name}\`.`);

          m.guild.settings.update('automod.auto_role.user', role.id);
          return m.channel.send(`<:blobthumbsup:398843278235009024> | \`${m.guild.name}\`'s auto join role for users has been successfully set to \`${role.name}\`.`);
        } catch (e) { return m.channel.send(m.language.get("COMMAND_ERROR", e)); }
      }
    }

    return m;
  }

};
