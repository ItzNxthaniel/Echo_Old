const { Command } = require("discord-akairo");

class Partner extends Command {
  constructor() {
    super("partner", {
      aliases: ["partner"],
      split: " || ",
      ownerOnly: true,
      args: [
        {
          id: "name"
        },
        {
          id: "desc"
        },
        {
          id: "owner"
        },
        {
          id: "iconURL"
        },
        {
          id: "invite"
        }
      ]
    });
  }
  exec(m, args) {
    if (m.channel.id != "408786425950240781") return m.channel.send("This command can only be ran in <#408786425950240781>");
    if (!args || !args.name || !args.desc || !args.owner || !args.iconURL || !args.invite) {
      m.delete();
      m.channel.send(":x: You're missing args, please check again!").then(snt => {
        setTimeout(() => { snt.delete(); }, 5000);
      });
    }
    m.delete();
    m.channel.send("<@&431210967595089926>", { embed: {
      color: this.client.options.colors.green, title: args.name, description: args.desc,
      author: { name: "Click here to join", url: args.invite },
      thumbnail: { url: args.iconURL }
    } });
    m.guild.members.get(args.owner).roles.add([this.client.options.roles.partner]);
  }
}

module.exports = Partner;