/* eslint-disable max-len */
const { Listener } = require("discord-akairo");

class CommandHandlerCommandStarted extends Listener {
  constructor() {
    super("commandHandlerCommandStarted", {
      emitter: "commandHandler",
      event: "commandStarted"
    });
  }
  exec(m, c) {
    if (["info", "database"].includes(c.id)) return;
    if (this.client.akairoOptions.hubID == m.guild.id && c.id == "subscribe" || !this.client.akairoOptions.testers.includes(m.author.id) && this.ownerID != m.author.id) return m.channel.send("Sorry you're not a tester and can't run commands on this bot.");
    if (m.guild) console.log(`User ${m.author.username} (${m.author.id}) issued server command ${this.client.akairoOptions.prefix}${c.id} in ${m.guild.name} (${m.guild.id}), #${m.channel.name}`);
    else console.log(`User ${m.author.username} (${m.author.id}) issued private command ${this.client.akairoOptions.prefix}${c.id}.`);
  }
}

module.exports = CommandHandlerCommandStarted;