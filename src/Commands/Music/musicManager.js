module.exports = {
  getVC: m => {
    if (m.member.voiceChannel) return "You're currently in, `" + m.member.voiceChannel.name + "`";
    return "You're aren't in any VC, join one and try again.";
  },
  check4VC: m => {
    if (m.member.voiceChannel) return true;
    return false;
  },
  play: m => {
    const vcCheck = this.check4VC(m);
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