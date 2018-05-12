module.exports = {
  getVC: m => {
    if (m.member.voiceChannel) return "You're currently in, `" + m.member.voiceChannel.name + "`";
    return "You're aren't in any VC, join one and try again.";
  },
  play: m => {
    const vcCheck = m.member.voiceChannel ? true : false;
    if (vcCheck) {
      const vc = m.member.voiceChannel;
      vc.join();
      return m.channel.send("I've joined the Voice Channel!");
    } else {
      return m.channel.send("You're not in a Voice Channel!");
    }
  },
  stop: m => {
    if (!m.guild.me.voiceChannel) return m.channel.send("I'm currently not in a Voice Channel.");
    const vc = m.guild.me.voiceChannel;
    vc.leave();
    return m.channel.send("I've left the voice channel.");
  }
};