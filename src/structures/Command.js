class Command {
  constructor(client, path, { aliases, desc, name }) {
    this.aliases = aliases || [];
    this.client = client;
    this.desc = desc || "No Description Available";
    this.name = name;
    this.path = path;
  }
  typing(p, channel) {
    if (p) return channel.startTyping();
    if (!p) return channel.stopTyping(true);
  }
}

module.exports = Command;