const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "leave",
      aliases: ["stop"],
      description: "Used to make the bot leave the current Voice Channel."
    });
  }
  async run(m) {
    if (!m.guild.me.voice.channel) return m.channel.send("<:bloboutage:396514815863947266> | I am not in a voice channel.");
    if (!m.member.voice.channel || m.member.voice.channel.id !== m.guild.me.voice.channel.id) return m.channel.send("<:bloboutage:396514815863947266> | You have to be in the same voice channel as me!");

    m.guild.me.voice.channel.leave();
    if (m.guild.settings.music.bound.chnID !== "0" && m.guild.settings.music.bound.setOnJoin) {
      m.guild.settings.update([["music.bound.chnID", "0"], ["music.bound.setOnJoin", false]]);
    }
    return m.channel.send(`<:blobthumbsup:398843278235009024> | I have successfully left, \`${m.member.voice.channel.name}\`!`);
  }

};
