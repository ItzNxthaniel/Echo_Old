const { Inhibitor } = require('../Modules/Index.js');

module.exports = class extends Inhibitor {

	async run(msg, command) {
		if (!msg.guild) return null;
		if (command.category !== 'Music') return null;
		const defProvider = this.client.providers.default;
		if (await this.client.providers.default.get('music', msg.guild.id)) return null;
		await defProvider.create('music', msg.guild.id);
		return defProvider.update('music', msg.guild.id, { queue: [] });
	}

};
