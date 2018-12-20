const klasa = require('klasa');
const discord = require('discord.js');
const rethink = require('rethinkdbdash');

module.exports = {
	...discord,
	...klasa,
	dversion: discord.version,
	kversion: klasa.version,
	DUtil: discord.Util,
	KUtil: klasa.util,
	rethink,
	...require('trello'),
	...require('../Private/Tokens.js')
};
