/* eslint-disable max-len */
const { AkairoClient } = require("discord-akairo");
const MongoDB = require("./MongoDB.js");
const path = require("path");
const { token } = require("./Data/Tokens.js");

const client = new AkairoClient({
  ownerID: "147891648628654082",
  prefix: "e:",
  allowMention: true,
  emitters: { process },
  commandDirectory: path.join(__dirname, "Commands"),
  listenerDirectory: path.join(__dirname, "Listeners"),
  inhibitorDirectory: path.join(__dirname, "Inhibitors")
}, {
  colors: {
    orange: 0xFFA500,
    green: 0x92EE8F,
    red: 0xFF9494
  },
  hubID: "406966876367749131",
  buildVersion: {
    idNum: "v2",
    idName: "Skeletons"
  },
  helpMsgs: [
    /* Goomig */
    "Help is flying through the sky, into your DMs!", "Help is sliding on ice, into your DMs!", "Whoops, Slip, SQUASH THAT REQUEST FOR HELP HERE I COME!",
    /* Dwigoric */
    "Sending 911 under your doormat!", "Delivering the savory pizza in front of your door!", "Sending angels into your mailbox!", "Hooman, I have heeded your request for help.", "So help me God", "Helping you get out of your problems...", "Magic stones, ye say? Right here under the kilt.", "Helping you escape the shadow realm...", "Let me check that I have this right...", "I am really sorry to hear that. Is there anything I can do to do for your request for help?", "That is a good question. Find it out yourself.", "I'm not sure, but don't ask me for help.", "I'm sorry, I don't have the information on that. May I put you on hold for a few minutes? I will clarify this with our manager.", "I'm sorry, this question would be out of my expertise, but Daniel from the tech support department will be able to help you. Would you like me to connect you with him?", "May I put your call on hold while I am checking your order?", "I'm sorry, Echo is not available right now. May I help you with something?", "I'm sorry, we don't have this feature at the moment. We do intend to add it to our service and we can notify you when it has been done. Would you like to receive an email update?",
    /* Wistful */
    "YA NEED HELP?",
    /* Fiery_Hacker */
    "Bringing in the reinforcements..."
  ],
  roles: {
    news: "420045140732805120",
    twitter: "420040434342166568",
    partner: "420043708210085901",
    partner_news: "431210967595089926"
  },
  disableEveryone: true
});

client.flup = function(text, m) {
  return text.substring(0, 1).toUpperCase() + text.substring(1, m.content.length);
};

// Debug && Error ~ By: Fire
client.debug = function() {
  const args = Array.prototype.slice.call(arguments);
  args.unshift(`[Shard ${client.options.shardId}]`);
  console.log.apply(console, args);
};

client.error = function() {
  const args = Array.prototype.slice.call(arguments);
  args.unshift(`[Shard ${client.options.shardId}]`);
  console.error.apply(console, args);
};


client.mongo = new MongoDB(client);
client.login(token);