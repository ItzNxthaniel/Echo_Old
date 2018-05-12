const { Command } = require("discord-akairo");

class Restart extends Command {
  constructor() {
    super("restart", {
      aliases: ["restart"],
      ownerOnly: true,
      args: [
        {
          id: "content",
          type: "lowercase"
        }
      ]
    });
  }
  async exec(m, args) {
    if (args.content == "all") {
      await m.channel.send("Restarting, the whole bot!");
      return process.exit();
    } else if (args.content != "all") {
      await m.channel.send(`Restarting shard ${this.client.shard.id}.`);
      return process.exit();
    } else {
      await m.channel.send(`Attempting to restart shard ${args.shardID}.`);
      await this.client.shard.broadcastEval(`if (this.shard.id == ${args.shardID.toString()}) process.exit();`);
    }
  }
}

module.exports = Restart;