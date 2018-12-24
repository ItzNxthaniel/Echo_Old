const { Event, MessageEmbed } = require("../Modules/Index.js");

module.exports = class extends Event {

  constructor(...args) {
    super(...args, { name: "klasaReady" });
  }

  async run() {
    this.client._initplayer();
    this.client.user.setActivity(`on ${this.client.guilds.size} ${this.client.guilds.size === 1 ? "server!" : "servers!"}`);
    console.log(`Online and ready! This shard is on ${this.client.guilds.size} guilds.`);

    setInterval(() => {
      const cS = this.client.options.playingS[Math.floor(Math.random() * this.client.options.playingS.length)];

      this.client.user.setActivity(cS.title, {
        type: cS.type
      });
    }, 60000);
    const { channel, timestamp } = this.client.settings.get('restart');
		if (!channel) return;
		this.client.channels.get(channel).send({
			embed: new MessageEmbed()
				.setColor(0x40E0D0)
				.setTitle('Bot has successfully restarted!')
				.setThumbnail(this.client.user.displayAvatarURL())
				.setDescription(`**Creeping through Discord...**\nand doing some magic!\n\nCurrently running on **${this.client.guilds.size}** guilds with **${this.client.guilds.reduce((a, b) => a + b.memberCount, 1)}** users.`) // eslint-disable-line max-len
				.setFooter(`Reboot command made by ${await this.client.users.fetch('295391820744228867').then(user => user.tag)} | Reboot duration: ${+`${`${Math.round(`${`${(Date.now() - timestamp) / 1000}e+2`}`)}e-2`}`}s`)
				.setTimestamp()
		});
		this.client.settings.reset(['restart.channel', 'restart.timestamp']);
  }

};
