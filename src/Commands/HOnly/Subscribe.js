const { Command } = require("discord-akairo");

class Subscribe extends Command {
  constructor() {
    super("subscribe", {
      aliases: ["subscribe", "sub"],
      split: "plain",
      args: [
        {
          id: "f",
          type: "lowercase"
        },
        {
          id: "s",
          type: "lowercase"
        },
        {
          id: "t",
          type: "lowercase"
        }
      ]
    });
  }
  exec(m, args) {
    if (!args.f) return m.channel.send(`You're forgetting what kind of subscription you'd like. (EX: \`${this.handler.prefix}sub +all\`)`);
    if (args.f == "+all" || args.f == "-all" && !args.s) {
      if (args.f == "+all") {
        m.member.roles.add([this.client.options.roles.twitter, this.client.options.roles.news, this.client.options.roles.partnerNews]);
        m.channel.send("Alright I've subscribed you to, `Twitter Updates`, `News Updates`, and `New Partner Updates`.");
      } else if (args.f == "-all") {
        m.member.roles.remove([this.client.options.roles.twitter, this.client.options.roles.news, this.client.options.roles.partnerNews]);
        m.channel.send("Alright I've unsubscribed you from, `Twitter Updates`, `News Updates`, and `New Partner Updates`.");
      }
    }
    if (args.f.substring(0, 1) == "+" || args.s.substring(0, 1) == "+" || args.t.substring(0, 1) == "+") {
      args.f = args.f.replace("+", "");
      if (args.s) args.f = args.s.replace("+", "");
      if (args.t) args.f = args.f.replace("+", "");
      m.channel.send(args.f);
    }
    if (args.f.substring(0, 1) == "-" || args.s.substring(0, 1) == "-" || args.t.substring(0, 1) == "-") return m.channel.send("-Soon:tm:");
  }
}

module.exports = Subscribe;