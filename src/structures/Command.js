/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const { promisify } = require("util");
const { key } = require("../util/Tokens.js").gOpts;
const gTrans = require("google-translate")(key);
const translatePromise = promisify(gTrans.translate);
const { langCodes } = require("../util/Config.js").lang;

class Command {
  constructor(client, path, { aliases, desc, name }) {
    this.aliases = aliases || [];
    this.client = client;
    this.desc = desc || "No Description Available";
    this.name = name;
    this.path = path;
  }
  async translate(lng, msg) {
    const lngCode = langCodes[lng];
    const r = await translatePromise(msg, lngCode);
    return r.translatedText;
  }
  typing(p, channel) {
    if (p) return channel.startTyping();
    if (!p) return channel.stopTyping(true);
  }
}

module.exports = Command;