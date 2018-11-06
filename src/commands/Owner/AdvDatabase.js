const { Command, KUtil: { mergeObjects, codeBlock } } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ["advdb"],
      permissionLevel: 9,
      description: 'The base command for getting database information',
      usage: '<debug|reset> [svr:guild]',
      usageDelim: ' ',
      subcommands: true
    });
  }

  async debug(m, [svr = m.guild]) {
    m.send(codeBlock('json', JSON.stringify(mergeObjects(await this.client.providers.default.get('guilds', svr.id) || { id: svr.id }, svr.settings.toJSON()), null, 2)));
  }

  async reset(m, [svr = m.guild]) {
    svr.settings.reset();
    m.send(`**${svr.name}**'s database has been reset.`);
  }

};
