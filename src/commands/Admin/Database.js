const { Command, KUtil } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'The base command for getting database information',
      usage: '<debug|reset|help> [GuildID:string]',
      usageDelim: ' ',
      subcommands: true
    })
  }

  async debug(m) {
    m.send(KUtil.codeBlock(m.language, await this.client.providers.default.get('guilds', m.guild.id)));
  };

  async reset(m) {
    this.client.guilds.get(m.guild.id).settings.reset();
    m.send(`Guild **${guildID}**'s database has been reset.`);
  };

};
