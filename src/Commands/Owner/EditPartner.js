const { Command } = require("discord-akairo");

class EditPartner extends Command {
  constructor() {
    super("editpartner", {
      aliases: ["epartner", "editp", "editpartner", "ep"],
      ownerOnly: true,
      split: " || ",
      args: [
        {
          id: "cID"
        },
        {
          id: "mID"
        },
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
  }
}

module.exports = EditPartner;