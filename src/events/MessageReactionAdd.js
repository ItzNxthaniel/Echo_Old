const { Event } = require('../Modules/Index.js');

const roles = {
  main: "521823218424741908",
  company: "521822642756386816",
  staff: "521822887334903818",
  downtime: "420045140732805120",
  database: "521823072945438730",
  bot: "439860510226251786",
  partner: "431210967595089926",
  stream: "521822411608555550",
  twitter: "420040434342166568",
  other: "521823548487237643"
};

module.exports = class extends Event {

  constructor(...args) {
    super(...args, {
      name: "messageReactionAdd",
      event: 'messageReactionAdd',
      enabled: true
    });
  }

  run(r, usr) {
    console.log(this.client.options.hubID);
    if (r.message.guild.id !== this.client.options.hubID) return;
    if (r.message.channel.id !== "406994802266079243") return;
    if (r.message.id !== "521832496997072932") return;

    const { guild } = r.message;

    if (r.emoji.toString === ":zero:") {
      if (guild.member(usr.id).roles.get(roles.company)) return;
      if (!guild.member(usr.id).roles.get(roles.main)) {
        guild.member(usr.id).roles.add([roles.main]);
      }
      guild.member(usr.id).roles.add([roles.company]);
    }
  }

};
