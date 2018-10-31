const { Command, KUtil: { mergeObjects, codeBlock } } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      permissionLevel: 8,
      description: 'The base command for getting database information',
      usage: '<debug|reset>',
      subcommands: true
    });
  }

  async debug(m) { // Can be ran by users with ADMIN perm, Bot Owners, and Server Owner!
    m.send(codeBlock('json', JSON.stringify(mergeObjects(await this.client.providers.default.get('guilds', m.guild.id) || { id: m.guild.id }, m.guild.settings.toJSON()), null, 2)));
  }

  async reset(m) { // Can only be ran by Server Owner and Bot Owner!
    if (!await m.hasAtLeastPermissionLevel(9)) return;
    this.client.guilds.get(m.guild.id).settings.reset();
    m.send(`Guild **${m.guild.id}**'s database has been reset.`);
  }

};
