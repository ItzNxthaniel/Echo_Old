const { Event } = require('../Modules/Index.js');

const roles = {
  main: "521823218424741908", // Subscriber
  '0⃣': "521822642756386816", // Company
  '1⃣': "521822887334903818", // Staff
  '2⃣': "420045140732805120", // Downtime
  '3⃣': "521823072945438730", // Database
  '4⃣': "439860510226251786", // Bot Updates
  '5⃣': "431210967595089926", // Partner Updates
  '6⃣': "521822411608555550", // Stream Updates
  '7⃣': "420040434342166568", // Twitter Updates
  '8⃣': "521823548487237643" // Other Updates
};

module.exports = class extends Event {

  constructor(...args) {
    super(...args, { name: 'messageReactionAdd' });
  }

  run(r, usr) {
    if (r.message.guild.id !== this.client.options.hubID) return;
    if (r.message.channel.id !== "406994802266079243") return;
    if (r.message.id !== "521832496997072932") return;

    const { guild } = r.message;

    if (!guild.member(usr.id).roles.has(roles.main)) guild.member(usr.id).roles.add(roles.main);
    if (!guild.member(usr.id).roles.has(roles[r.emoji.name])) guild.member(usr.id).roles.add(roles[r.emoji.name]);
  }

};
