module.exports = {
  getVC: m => {
    if (m.member.voiceChannel) return "You're currently in, `" + m.member.voiceChannel.name + "`";
    return "You're aren't in any VC, join one and try again.";
  }
};