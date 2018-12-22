const { Command } = require("../../Modules/Index.js");

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

    this.customizeResponse('choice', (m) => "`*` ***GLOBAL SETTINGS:***\n \n`<{choice} {setting}>`\n \n`*` ***PRIVATE SETTINGS:***\n \n`<{choice} {option}>`\n \n`*` ***HAVING TROUBLE?***\n  \nTry running, `" + m.guild.settings.prefix + m.content.split(' ')[0].slice(m.prefixLength) + " help <CHOICE>`\n *or* join the support server. Run, `" + m.guild.settings.prefix + "links`");
    this.customizeResponse('setting', (m) => "`*` ***GLOBAL SETTINGS:***\n \n`<{choice} {setting}>`\n \n`*` ***PRIVATE SETTINGS:***\n \n`<{choice} {option}>`\n \n`*` ***HAVING TROUBLE?***\n  \nTry running, `" + m.guild.settings.prefix + m.content.split(' ')[0].slice(m.prefixLength) + " help <CHOICE>`\n *or* join the support server. Run, `" + m.guild.settings.prefix + "links`");
  }

  run(m, [choice, setting]) {
    choice = choice.toUpperCase();
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

    return m;
  }

};
