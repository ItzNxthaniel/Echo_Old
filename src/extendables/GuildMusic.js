const { Extendable, KlasaGuild } = require('../Modules/Index.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [KlasaGuild] });
	}

	get music() {
		return this.client.providers.default.get('music', this.id);
	}

	get player() {
		return this.client.player.spawnPlayer({
			guild: this.id,
			host: this.client.options.nodes[0].host,
			channel: (this.channels.filter(ch => ch.type === 'voice' && ch.members.has(this.me.id)) || { id: null }).id
		});
	}

};
