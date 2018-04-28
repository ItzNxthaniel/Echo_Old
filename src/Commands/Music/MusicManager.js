exports.getVC = function(m) {
  if (m.member.voiceChannel) return "You're currently in, `" + m.member.voiceChannel.name + "`";
  return "You arn't in a voiceChannel!";
};