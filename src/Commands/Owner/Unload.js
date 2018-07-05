/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the VFD Contribution Only License.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('discord-akairo');

class Unload extends Command {
  constructor() {
    super('unload', {
      aliases: ['unload'],
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
    handler.remove(args.id);
    return m.channel.send(`Removed module \`${args.id}\` from ${handler.name}.`);
  }
}

module.exports = Unload;
