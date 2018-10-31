const { Command, KUtil } = require('../../Modules/Index.js');
const { inspect } = require('util');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'The base command for getting database information',
      usage: '<debug|reset>',
      subcommands: true
    });
  }

  async debug(m) { // Can be ran by users with ADMIN perm, Bot Owners, and Server Owner!
    m.send(KUtil.codeBlock('json', JSON.stringify(require('klasa').util.mergeObjects(await this.client.providers.default.get('guilds', msg.guild.id) || { id: msg.guild.id }, msg.guild.settings.toJSON()), null, 2)));
  }

  async reset(m) { // Can only be ran by Server Owner and Bot Owner!
    this.client.guilds.get(m.guild.id).settings.reset();
    m.send(`Guild **${m.guild.id}**'s database has been reset.`);
  }

};
