/* eslint-disable max-len */
const { Command } = require("discord-akairo");

class Partner extends Command {
  constructor() {
    super("partner", {
      aliases: ["partner"],
      split: " || ",
      args: [
        {
          id: "cID"
        },
        {
          id: "sName"
        },
        {
          id: "sDesc"
        },
        {
          id: "sID"
        },
        {
          id: "sOwner"
        },
        {
          id: "sIconURL"
        },
        {
          id: "sInv"
        }
      ]
    });
  }
  exec(m, args) {
    if (!m.member.roles.get(this.client.options.roles.pManager)) return m.channel.send(":x: Sorry you need to be a Partner Manager to run this command!");
    if (m.channel.id != "451241090301820948") return m.channel.send("You need to run this command in <#451241090301820948>! *Auto Delete in 5 Seconds!*").then(snt => setTimeout(() => { snt.delete(); }, 5000));
    if (args.cID != "451240344953028608" && args.cID != "408786425950240781") {
      return m.channel.send(":x: Sorry you need to supply what listing channel you'd like this to be sent to. *Auto Delete in 5 Seconds!*").then(snt => {
        setTimeout(() => {
          m.delete();
          snt.delete();
        }, 5000);
      });
    }
    if (!args || !args.sName || !args.sDesc || !args.sID || !args.sOwner || !args.sIconURL || !args.sInv) {
      return m.channel.send(":x: You're missing arguments! *Auto Delete in 5 Seconds!*").then(snt => {
        setTimeout(() => {
          m.delete();
          snt.delete();
        }, 5000);
      });
    }
    if (!this.client.guilds.get(args.sID)) {
      return m.channel.send("I'm not in that server! Please allow me to join the server so I can give them Partner Benefits. *Auto Delete in 5 Seconds!*").then(snt => {
        setTimeout(() => {
          m.delete();
          snt.delete();
        }, 5000);
      });
    }

    const c = this.client.channels.get(args.cID);
    c.send("<@&431210967595089926>", { embed: {
      color: this.client.options.colors.green, title: args.sName + " || " + this.client.users.get(args.sOwner).tag, description: args.sDesc,
      author: { name: "Click here to join", url: args.sInv },
      thumbnail: { url: args.sIconURL }
    } }).then(snt => {
      this.client.mongo.createPartner(args.sID, snt.id);
      this.client.users.get(args.sOwner).send(":tada: Congrats! Your server has been accepted to the partnership program with ***__TearinDev__***! Thanks for your patience");
      m.guild.members.get(args.sOwner).roles.add([this.client.options.roles.partner]);
      m.channel.send("<:vfdGreenTick:378652440758845442> Alright I've added them to the partner list!").then(sent => {
        setTimeout(() => {
          m.delete();
          sent.delete();
        }, 5000);
      });
    });
  }
}

module.exports = Partner;

/*
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
      return m.channel.send(":x: You're missing args, please check again!").then(snt => {
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
*/