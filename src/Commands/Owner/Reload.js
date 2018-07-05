/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the VFD Contribution Only License.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('discord-akairo');

class Reload extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload'],
      ownerOnly: true,
      args: [
        {
          id: 'handler'
        },
        {
          id: 'id'
        }
      ]
    });
  }
  async exec(m, args) {
    if (!args.handler) return await m.channel.send('You must include the handler.');
    if (!args.id) return await m.channel.send('You must include an id.');
    const handler = this.client[args.handler + 'Handler'];
    if (!handler) return await m.channel.send('Invalid Handler');
    if (args.id == 'all') {
      handler.reloadAll();
      return await m.channel.send(`Reloaded all modules in the ${handler.name}.`);
    }
    handler.reload(args.id);
    return m.channel.send(`Reloaded module \`${args.id}\` in ${handler.name}.`);
  }
}

module.exports = Reload;
