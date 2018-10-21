const klasa = require('klasa');
const discord = require('discord.js');

module.exports = {
	...discord,
	...klasa,
	dversion: discord.version,
	kversion: klasa.version,
	DUtil: discord.Util,
	KUtil: klasa.util,
	...require('../Private/Tokens.js')
};
