const { Extendable, KlasaGuild } = require('../Modules/Index.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [KlasaGuild] });
		this.donations = this.client.gateways.donations.get(this.id, true);
	}

};
