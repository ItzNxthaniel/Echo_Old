const { Event } = require('../Modules/Index.js');

const roles = {
  main: "521823218424741908",
  '0⃣': "521822642756386816",
  '1⃣': "521822887334903818",
  '2⃣': "420045140732805120",
  '3⃣': "521823072945438730",
  '4⃣': "439860510226251786",
  '5⃣': "431210967595089926",
  '6⃣': "521822411608555550",
  '7⃣': "420040434342166568",
  '8⃣': "521823548487237643"
};

module.exports = class extends Event {

  constructor(...args) {
    super(...args, { name: 'messageReactionRemove' });
  }

  run(r, usr) {
    if (r.message.guild.id !== this.client.options.hubID) return;
    if (r.message.channel.id !== "406994802266079243") return;
    if (r.message.id !== "521832496997072932") return;

	const { guild } = r.message;

	if (guild.member(usr.id).roles.has(roles[r.emoji.name])) guild.member(usr.id).roles.remove(roles[r.emoji.name]);
	if (!Object.values(roles).some(role => role !== roles.main && guild.member(usr.id).roles.has(role))) guild.member(usr.id).roles.remove(roles.main);
  }

};
