const Command = require("../../structures/Command.js");
const roles = {
  news: "420045140732805120",
  twitter: "420040434342166568"
};

class Subscribe extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "subscribe",
      desc: "Allows users to subscribe to roles on hub server.",
      aliases: ["sub"]
    });
  }
  execute(m) {
    this.typing(true, m.channel);
    if (m.guild.id != this.client.config.hubID) {
      this.typing(false, m.channel);
      return m.channel.send(`Sorry this command can only be sent in the hub. Run \`${m.guildData.settings.prefix != "default" ? m.guild.settings.prefix : "e$"}hub\` to get the invite!`);
    }
    const s = m.argsLower[1];
    if (!roles[s] && s != "all") {
      this.typing(false, m.channel);
      return m.channel.send(":interrobang: I couldn't find that subscribe option! The options are,\n`News` -> Bot Updates and more,\n`Twitter` -> Twitter Updates,\n`All` -> Subscribes you to both, News and Twitter updates!");
    }
    if (s == "all") {
      this.typing(false, m.channel);
      m.member.roles.add([roles.news, roles.twitter]);
      return m.channel.send("Alright, I've subscribed you to `News Updates` and `Twitter Updates`.");
    }
    try {
      this.typing(false, m.channel);
      m.member.roles.add(roles[s]);
      return m.channel.send(`Alright, I've subscribed you to \`${m.flup(s)}\`.`);
    } catch (e) {
      this.typing(false, m.channel);
      m.channel.send("There was an error subscribing you to that!");
      m.errors.internalError(e);
    }
  }
}


module.exports = Subscribe;