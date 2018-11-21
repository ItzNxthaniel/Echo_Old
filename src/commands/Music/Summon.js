const { Command } = require('../../Modules/Index.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      name: "summon",
      aliases: ["join"],
      description: "Allows you to have the bot join the voice channel."
    });
  }
  async run(m) {
    if (!m.member.voice.channel) return m.channel.send("<:bloboutage:396514815863947266> | You're not in a voice channel. | Please join one!");
    if (!m.member.voice.channel.joinable) return m.channel.send(`<:bloboutage:396514815863947266> | I cannot join, \`${m.member.voice.channel.name}\`!`);
    if (!m.member.voice.channel.speakable) return m.channel.send(`<:bloboutage:396514815863947266> | I cannot speak in, \`${m.member.voice.channel.name}\`!`);

    if (m.guild.me.voice.channel) return m.channel.send("<:bloboutage:396514815863947266> | I am already in a voice channel.");

    m.member.voice.channel.join();

    if (m.guild.settings.music.bound.chnID === "0") {
      m.guild.settings.update([['music.bound.chnID', m.channel.id], ["music.bound.setOnJoin", true]]);
      return m.channel.send(`<:blobthumbsup:398843278235009024> | I have successfully joined, \`${m.member.voice.channel.name}\`! | I have also bounded all now-playing messages to, \`${m.channel.name}\`, don't worry you can still run comamnds anywhere you would like in your server!`);
    }
      return m.channel.send(`<:blobthumbsup:398843278235009024> | I have successfully joined, \`${m.member.voice.channel.name}\`! | All now-playing messages will be sent to, \`${await m.guild.channels.get(m.guild.settings.music.bound.chnID).name}\`!`);
  }

};
