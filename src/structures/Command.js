/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const { langCodes } = require("../util/Config.js").lang;
const { key } = require("../util/Tokens.js").gOpts;
const gTrans = require("google-translate")(key);

class Command {
  constructor(client, path, { aliases, desc, name }) {
    this.aliases = aliases || [];
    this.client = client;
    this.desc = desc || "No Description Available";
    this.name = name;
    this.path = path;
  }
  translate(lng, msg) {
    const lngCode = langCodes[lng];
    gTrans.translate(msg, lngCode, function(err, r) {
      if (err) return console.error(err);
      return r.translatedText;
    });
  }
  typing(p, channel) {
    if (p) return channel.startTyping();
    if (!p) return channel.stopTyping(true);
  }
}

module.exports = Command;