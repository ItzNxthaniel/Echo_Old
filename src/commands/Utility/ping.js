const Command = require("../../structures/Command.js");

class Ping extends Command {
  constructor(client, path) {
    super(client, path, {
      name: "ping",
      desc: "Pings the bot for the current WebSocket speed."
    });
  }
  async execute(m) {
    this.typing(true, m.channel);
    let p;
    try {
      if (!this.client.getAllShardsAvailable()) throw new Error();
      p = await this.client.shard.broadcastEval("this.ping");
    } catch (e) {
      this.end(m.channel);
      return m.channel.send(`There was an issue pinging all shards. This shard took ` +
        `${this.client.shard.ping.toFixed(0)} milliseconds to ping back.`);
    }
    const avg = p.reduce((a, b) => a + b, 0) / p.length;
    let str = "";
    for (let i = 0; i < this.client.shard.count; i++) {
      if (p[i]) {
        const tShard = await this.translate(m.guildData.settings.lang, `Shard ${i}: ${p[i].toFixed(0)} milliseconds.`);
        const stringToUse = m.guildData.settings.lang != "english" ? tShard : `Shard ${i}: ${p[i].toFixed(0)} milliseconds.`;
        str += `${stringToUse}\n`;
      } else {
        const unfound = await this.translate(m.guildData.settings.lang, `Shard ${i}: Unavailable.\n`);
        const stringToUse = m.guildData.settings.lang != "english" ? unfound : `Shard ${i}: Unavailable.`;
        str += `${stringToUse}\n`;
      }
    }
    const aP = await this.translate(m.guildData.settings.lang, `Average Ping: ${avg.toFixed(0)} milliseconds.`);
    const string2Use = m.guildData.settings.lang != "english" ? aP : `Average Ping: ${avg.toFixed(0)} milliseconds.`;
    str += string2Use;
    this.typing(false, m.channel);
    return m.channel.send(str);
  }
}

module.exports = Ping;
