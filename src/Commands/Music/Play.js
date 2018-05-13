const { Command } = require("discord-akairo");
const { gOpts } = require("../../Data/Tokens.js");
const search = require("youtube-search");
const yt = require("ytdl-core");

class Play extends Command {
  constructor() {
    super("play", {
      aliases: ["play"],
      args: [
        {
          id: "songURL"
        }
      ]
    });
  }
  exec(m, args) {
    const vcCheck = m.member.voiceChannel ? true : false;
    if (vcCheck) {
      const vc = m.member.voiceChannel;
      vc.join().then(connection => {
        search(args.songURL, gOpts, (e, r) => {
          if (e) return m.channel.send(`\`ERROR\` \`\`\`xl\n${e.stack}\n\`\`\``);

          if (r < 1) return m.channel.send("I couldn't find a video on youtube with that URL!");

          const stream = yt(r[0].link, { filter: "audioonly" });
          const dispatcher = connection.play(stream);
          m.channel.send("Now playing: " + r[0].title);

          dispatcher.on("end", () => {
            vc.leave();
            return m.channel.send("I've left the voice channel due to the song being over!");
          });
        });
      });
    } else {
      return m.channel.send("You're not in a Voice Channel!");
    }
  }
}

module.exports = Play;