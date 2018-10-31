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

  async debug(m) {
    m.send(KUtil.codeBlock('js', inspect(await this.client.providers.default.get('guilds', m.guild.id))));
  }

  async reset(m) {
    this.client.guilds.get(m.guild.id).settings.reset();
    m.send(`Guild **${m.guild.id}**'s database has been reset.`);
  }

};
