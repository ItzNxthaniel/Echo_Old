/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the VFD Contribution Only License.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('discord-akairo');
const path = require('path');

class Load extends Command {
  constructor() {
    super('load', {
      aliases: ['load'],
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
    if (!args.id) return await m.channel.send('You must include a file path (relative from src/).');
    const handler = this.client[args.handler + 'Handler'];
    if (!handler) return await m.channel.send('Invalid Handler');
    handler.load(path.join(__dirname, '../../', args.id));
    return m.channel.send(`Added module \`${args.id}\` in ${handler.name}.`);
  }
}

module.exports = Load;
