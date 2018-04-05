/* eslint-disable max-len */
const { Command } = require("discord-akairo");

class Subscribe extends Command {
  constructor() {
    super("subscribe", {
      aliases: ["subscribe", "sub"],
      split: "plain",
      args: [
        { id: "option", type: "lowercase" }
      ]
    });
  }
  async exec(m, args) {
    if (m.guild.id != "406966876367749131") return m.channel.send(`Sorry this command can only be sent in the hub. Run \`${this.handler.prefix}hub\` to get the invite!`);
    if (!args.option) return m.channel.send(":interrobang: I couldn't find that subscribe option! The options are,\n`News` -> Bot Updates and more,\n`Twitter` -> Twitter Updates,\n`Partner_News` -> New Partner Updates\n`All` -> Subscribes you to all of them, Partner, News, and Twitter updates!");
    let f;
    if (args.option.substring(0, 1) == "+") f = args.option.replace("+", "");
    if (args.option.substring(0, 1) == "-") f = args.option.replace("-", "");
    if (!this.client.options.roles[f] && f != "all") return m.channel.send(":interrobang: I couldn't find that subscribe option! The options are,\n`News` -> Bot Updates and more,\n`Twitter` -> Twitter Updates,\n`Partner_News` -> New Partner Updates\n`All` -> Subscribes you to all of them, Partner, News, and Twitter updates!");
    if (args.option == "+all" || args.option == "-all") {
      if (args.option == "+all") {
        m.member.roles.add([this.client.options.roles.twitter, this.client.options.roles.news, this.client.options.roles.partner_news]);
        return m.channel.send("Alright I've subscribed you to, `Twitter Updates`, `News Updates`, and `New Partner Updates`.");
      } else if (args.option == "-all") {
        m.member.roles.remove([this.client.options.roles.twitter, this.client.options.roles.news, this.client.options.roles.partner_news]);
        return m.channel.send("Alright I've unsubscribed you from, `Twitter Updates`, `News Updates`, and `New Partner Updates`.");
      }
    }
    if (args.option.substring(0, 1) == "+") {
      await m.member.roles.add(this.client.options.roles[f]);
      return m.channel.send(`Alright, I've subscribed you to \`${this.client.flup(f, m)}\``);
    } else if (args.option.substring(0, 1) == "-") {
      await m.member.roles.remove(this.client.options.roles[f]);
      return m.channel.send("Alright, I've unsubscribed you from that.");
    }
  }
}

module.exports = Subscribe;